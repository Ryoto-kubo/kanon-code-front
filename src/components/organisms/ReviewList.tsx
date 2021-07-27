import { Price } from "@/components/atoms/Price";
import { ErrorView } from "@/components/common/error";
import { CustomLoader } from "@/components/common/loader";
import { AnnounceOpenReview } from "@/components/molecules/AnnounceOpenReview";
import { RequestItemUser } from "@/components/molecules/RequestItemUser";
import { RightBorderTitle } from "@/components/molecules/RightBorderTitle";
import { RelaxIllustration } from "@/components/parts/illustrations/relax";
import { PaymentDialog } from "@/components/parts/paymentDialog";
import { Reaction } from "@/components/parts/reaction";
import { RegistCreditAnnounceDialog } from "@/components/parts/registCreditAnnounceDialog";
import { SigninDialog } from "@/components/parts/signinDialog";
import { PAYMENT_FREE, REVIEW_PREFIX, USER_PREFIX } from "@/consts/const";
import theme from "@/styles/theme";
import { CustomReviewTypes } from "@/types/global";
import { CreditTypes, UserProfileTypes } from "@/types/global/";
import { postPayment } from "@/utils/api/post-payment";
import { postRegisterPayment } from "@/utils/api/post-register-payment";
import { getStripe } from "@/utils/stripe";
import Box from "@material-ui/core/Box";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import marked from "marked";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

type Props = {
  status: boolean;
  credit: CreditTypes;
  reviews: CustomReviewTypes[];
  setReviews: React.Dispatch<React.SetStateAction<CustomReviewTypes[] | null>>;
  isMe: boolean;
  isLoading: boolean;
  authUserName: string;
  postId: string;
  isReviewsLoading: boolean;
  userProfile: UserProfileTypes | null;
  paymentedList: { [key: string]: boolean } | null;
  setPaymentedList: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean } | null>
  >;
};

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 24px;
  border-bottom: 3px solid ${theme.palette.primary.main};
`;
const StyledBoxBorder = styled(Box)`
  // border: 1px dashed #dddddd;
  // border: 1px solid ${theme.palette.primary.main};
  width: 100%;
  margin: 8px 0;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper: React.FC<Props> = ({
  status,
  credit,
  reviews,
  setReviews,
  isMe,
  isLoading,
  authUserName,
  postId,
  userProfile,
  paymentedList,
  setPaymentedList,
}) => {
  const partitionKey = `${USER_PREFIX}#${authUserName}`; // my user id
  const myReviewId = `${postId}#${REVIEW_PREFIX}#${authUserName}`;
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpenCreditAnnounce, setIsOpenCreditAnnounce] = useState(false);
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [iconSrc, setIconSrc] = useState("");
  const [price, setPrice] = useState(0);
  const [reviewId, setReviewId] = useState("");
  const [reviewerId, setReviewerId] = useState("");
  const [isSucceeded, setIsSucceeded] = useState(false);
  const stripe = useStripe();
  const showToggleDialog = (
    argReviewId: string,
    argTitle: string,
    argName: string,
    argIconSrc: string,
    argPrice: number,
    argReviewerId: string
  ) => {
    if (authUserName === "") {
      setIsOpenSignin(true);
      return;
    }
    if (!credit) {
      setIsOpenCreditAnnounce(true);
      return;
    }
    if (partitionKey !== credit.partition_key) return;
    setIsSucceeded(false);
    setReviewId(argReviewId);
    setTitle(argTitle);
    setName(argName);
    setIconSrc(argIconSrc);
    setPrice(argPrice);
    setReviewerId(argReviewerId);
    setIsOpenPayment(true);
  };
  const createParams = () => {
    return {
      postId,
      reviewId,
      userId: partitionKey,
      price,
      title,
      paymentMethod: credit!.setup_method,
      customerId: credit!.customer_id,
    };
  };
  const createRegisterPaymentParams = () => {
    const profile = userProfile!;
    return {
      userId: partitionKey,
      reviewId,
      reviewerId,
      postId,
      profile,
      price,
    };
  };
  const payment = async () => {
    if (!credit) return;
    const err = new Error();
    const params = createParams();
    const registerParams = createRegisterPaymentParams();
    setIsDisabled(true);
    try {
      const response = await postPayment(params);
      if (!response.data.status) throw err;
      const clientSecret = response.data.client_secret;
      if (!stripe || !clientSecret) return;
      const paymentResult = await stripe.confirmCardPayment(clientSecret);
      if (paymentResult.paymentIntent?.status !== "succeeded") throw err;
      const registerResult = await postRegisterPayment(registerParams);
      const newReviews = reviews!.slice();
      for (const item of newReviews) {
        if (item.sort_key === reviewId) {
          item.contents.review.display_body_html =
            registerResult.data.contents.review.body_html;
        }
      }
      setReviews(newReviews);
      setPaymentedList({ ...paymentedList, [reviewId]: true });
      setIsSucceeded(true);
      setIsDisabled(false);
    } catch (error) {
      console.error(error);
      setIsDisabled(false);
    }
  };
  const closeSigninDialog = useCallback(() => {
    setIsOpenSignin(false);
  }, []);
  const closePaymentDialog = useCallback(() => {
    setIsOpenPayment(false);
  }, []);
  const closeCreditDialog = useCallback(() => {
    setIsOpenCreditAnnounce(false);
  }, []);
  const renderReviewedItem = (el: CustomReviewTypes, index: number) => {
    const name = el.user_profile.display_name;
    const iconSrc = el.user_profile.icon_src;
    const price = el.price;
    const contents = el.contents;
    const title = contents.review.title;
    const date = `${el.create_year}/${el.create_month}/${el.create_day}`;
    const displayBodyHtml = contents.review.display_body_html;
    const isSelfReviewItem = el.sort_key === myReviewId;
    const isPaymentFree = el.payment_type === PAYMENT_FREE;
    const sortKey = el.sort_key;
    const reviewerId = el.user_id;
    return (
      <Box key={index} component="section" mb={7}>
        <StyledBoxFlex mb={2}>
          <RequestItemUser
            name={name}
            date={date}
            userIcon={iconSrc}
            width={"32px"}
            height={"32px"}
          />
          {isSelfReviewItem ? (
            <Price color="#5C6BC0" text="自身のレビュー" />
          ) : paymentedList![sortKey] ? (
            <Price color="#EC576B" text="購入済み" />
          ) : (
            <Price
              color={isPaymentFree ? "#5C6BC0" : "#EC576B"}
              text={isPaymentFree ? "FREE!!" : `¥${price}`}
            />
          )}
        </StyledBoxFlex>
        <StyledBoxTitleWrapper>
          <h1>{title}</h1>
        </StyledBoxTitleWrapper>
        <Box mb={5}>
          <div className="review-item-wrapper">
            <span
              dangerouslySetInnerHTML={{
                __html: marked(displayBodyHtml),
              }}
            />
          </div>
        </Box>
        {!isSelfReviewItem && !isPaymentFree && paymentedList![sortKey] && (
          <Reaction
            sortKey={sortKey}
            postId={postId}
            reactionUserIcons={el.reaction_user_icons}
            userIcon={userProfile!.icon_src}
          />
        )}
        {!isSelfReviewItem && !isPaymentFree && !paymentedList![sortKey] && (
          <AnnounceOpenReview
            title={title}
            profile={el.user_profile}
            width={"40px"}
            height={"40px"}
            price={price}
            showToggleDialog={() =>
              showToggleDialog(sortKey, title, name, iconSrc, price, reviewerId)
            }
          />
        )}
        <StyledBoxBorder />
      </Box>
    );
  };

  return (
    <>
      {isLoading ? (
        <Box position="relative" padding={2}>
          <CustomLoader width={30} height={30} />
        </Box>
      ) : status ? (
        reviews.length > 0 ? (
          reviews.map((el, index) => renderReviewedItem(el, index))
        ) : isMe ? (
          <RelaxIllustration secondText="リラックスして少し休憩しませんか？" />
        ) : (
          <RelaxIllustration />
        )
      ) : (
        <ErrorView />
      )}
      <PaymentDialog
        title={title}
        name={name}
        iconSrc={iconSrc}
        price={price}
        isSucceeded={isSucceeded}
        isDisabled={isDisabled}
        width={"30px"}
        height={"30px"}
        isOpenDialog={isOpenPayment}
        closeDialog={closePaymentDialog}
        payment={payment}
      />
      <RegistCreditAnnounceDialog
        isOpenDialog={isOpenCreditAnnounce}
        showToggleDialog={closeCreditDialog}
      />
      <SigninDialog
        isOpenDialog={isOpenSignin}
        closeDialog={closeSigninDialog}
      />
    </>
  );
};

export const ReviewList = (props: Props) => {
  const promiseStripe = getStripe();

  return (
    <Elements stripe={promiseStripe}>
      <RightBorderTitle text="Review List" fontSize={20} marginBottom={0} />
      {props.isReviewsLoading ? (
        <Box position="relative" padding={2}>
          <CustomLoader width={30} height={30} />
        </Box>
      ) : (
        <Wrapper {...props} />
      )}
    </Elements>
  );
};
