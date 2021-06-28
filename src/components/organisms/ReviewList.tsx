import { Price } from "@/components/atoms/Price";
import { CustomLoader } from "@/components/common/loader";
import { AnnounceOpenReview } from "@/components/molecules/AnnounceOpenReview";
import { RequestItemUser } from "@/components/molecules/RequestItemUser";
import { RightBorderTitle } from "@/components/molecules/RightBorderTitle";
import { PaymentDialog } from "@/components/parts/paymentDialog";
import { RegistCreditAnnounceDialog } from "@/components/parts/registCreditAnnounceDialog";
import { SigninDialog } from "@/components/parts/signinDialog";
import { PAYMENT_FREE, REVIEW_PREFIX, USER_PREFIX } from "@/consts/const";
import { useCredit } from "@/hooks/useCredit";
import theme from "@/styles/theme";
import { ReviewTypes } from "@/types/global/";
import { postPayment } from "@/utils/api/post-payment";
import { getStripe } from "@/utils/stripe";
import Box from "@material-ui/core/Box";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import marked from "marked";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  reviews: ReviewTypes[];
  authUserId: string;
  postId: string;
};

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 8px;
  border-bottom: 3px solid ${theme.palette.primary.main};
`;
const StyledBoxBorder = styled(Box)`
  border: 1px dashed #dddddd;
  // border: 1px solid ${theme.palette.primary.main};
  width: 100%;
  margin: 8px 0;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper: React.FC<Props> = ({ reviews, authUserId, postId }) => {
  const partitionKey = `${USER_PREFIX}${authUserId}`; // my user id
  const myReviewId = `${REVIEW_PREFIX}${USER_PREFIX}${authUserId}`;
  const [paymentedList, setPaymentedList] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpenCreditAnnounce, setIsOpenCreditAnnounce] = useState(false);
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [iconSrc, setIconSrc] = useState("");
  const [price, setPrice] = useState(0);
  const [reviewId, setReviewId] = useState("");
  const [isSucceeded, setIsSucceeded] = useState(false);
  const { credit, isLoading } = useCredit(authUserId);
  const stripe = useStripe();

  console.log(credit, "credit");
  console.log(reviews, "reviews");
  useEffect(() => {
    const reviewIdList = reviews.map((el) => el.sort_key);
    const paymentedList: { [key: string]: boolean } = {};
    for (const reviewId of reviewIdList) {
      paymentedList[reviewId] = false;
    }
    setPaymentedList(paymentedList);
  }, []);
  console.log(paymentedList);

  const showToggleDialog = (
    argReviewId: string,
    argTitle: string,
    argName: string,
    argIconSrc: string,
    argPrice: number
  ) => {
    if (authUserId === "") {
      setIsOpenSignin(true);
      return;
    }
    if (credit === null) {
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
  const payment = async () => {
    if (!credit) return;
    const err = new Error();
    const params = createParams();
    setIsDisabled(true);
    try {
      const response = await postPayment(params);
      if (!response.data.status) throw err;
      const clientSecret = response.data.client_secret;
      console.log(response, "response");
      if (!stripe || !clientSecret) return;
      const paymentResult = await stripe.confirmCardPayment(clientSecret);
      console.log(paymentResult, "paymentResult");
      if (paymentResult.paymentIntent?.status !== "succeeded") throw err;
      setPaymentedList({
        ...paymentedList,
        [reviewId]: true,
      });
      setIsSucceeded(true);
      setIsDisabled(false);
      console.log(params);
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
  const renderReviewedItem = (el: ReviewTypes, index: number) => {
    const name = el.user_profile.display_name;
    const iconSrc = el.user_profile.icon_src;
    const price = el.price;
    const title = el.contents.review.title;
    const date = `${el.create_year}/${el.create_month}/${el.create_day}`;
    const bodyHtml = el.contents.review.body_html;
    const displayBodyHtml = el.contents.review.display_body_html;
    const isSelfReviewItem = el.sort_key === myReviewId;
    const isPaymentFree = el.payment_type === PAYMENT_FREE;
    const sortKey = el.sort_key;
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
          {!isSelfReviewItem && (
            <Price
              color={isPaymentFree ? "#5C6BC0" : "#EC576B"}
              text={isPaymentFree ? "FREE" : `¥${price}`}
            />
          )}
        </StyledBoxFlex>
        <StyledBoxTitleWrapper>
          <h1>{title}</h1>
        </StyledBoxTitleWrapper>
        <div className="review-item-wrapper">
          <span
            dangerouslySetInnerHTML={{
              __html: marked(
                isSelfReviewItem || isPaymentFree || paymentedList[sortKey]
                  ? bodyHtml
                  : displayBodyHtml
              ),
            }}
          />
        </div>
        {!isSelfReviewItem && !isPaymentFree && !paymentedList[sortKey] && (
          <AnnounceOpenReview
            title={title}
            profile={el.user_profile}
            width={"40px"}
            height={"40px"}
            price={price}
            showToggleDialog={() =>
              showToggleDialog(sortKey, title, name, iconSrc, price)
            }
          />
        )}
        <StyledBoxBorder />
      </Box>
    );
  };

  return (
    <>
      <RightBorderTitle text="Review List" fontSize={20} marginBottom={0} />
      {isLoading ? (
        <Box position="relative" padding={2}>
          <CustomLoader width={30} height={30} />
        </Box>
      ) : (
        reviews.map((el, index) => renderReviewedItem(el, index))
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
      <Wrapper {...props} />
    </Elements>
  );
};
