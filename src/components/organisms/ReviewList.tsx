import { Price } from '@/components/atoms/Price';
import { ErrorView } from '@/components/common/error';
import { CustomLoader } from '@/components/common/loader';
import { AnnounceOpenReview } from '@/components/molecules/AnnounceOpenReview';
import { ReviewUser } from '@/components/molecules/ReviewUser';
import { RightBorderTitle } from '@/components/molecules/RightBorderTitle';
import { RelaxIllustration } from '@/components/parts/illustrations/relax';
import { PaymentDialog } from '@/components/parts/paymentDialog';
import { Reaction } from '@/components/parts/reaction';
import { RegistCreditAnnounceDialog } from '@/components/parts/registCreditAnnounceDialog';
import { SigninDialog } from '@/components/parts/signinDialog';
import { PAYMENT_FREE, REVIEW_PREFIX, USER_PREFIX } from '@/consts/const';
import { errorMessages } from '@/consts/error-messages';
import theme from '@/styles/theme';
import { CustomReviewTypes } from '@/types/global';
import { CreditTypes, UserProfileTypes } from '@/types/global/';
import { deleteRegisterPayment } from '@/utils/api/delete-register-payment';
import { postPayment } from '@/utils/api/post-payment';
import { postRegisterPayment } from '@/utils/api/post-register-payment';
import * as gtag from '@/utils/gtag';
import { getStripe } from '@/utils/stripe';
import Box from '@material-ui/core/Box';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import marked from 'marked';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentEditor } from './CommentEditor';

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
  paymentedList: { [key: string]: boolean };
  setPaymentedList: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean } | null>
  >;
};
const StyledBoxReviewWrapper = Box;
const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 24px;
  border-bottom: 3px solid ${theme.palette.primary.main};
`;
const StyledBoxBorder = styled(Box)`
  width: 100%;
  margin: 8px 0;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledBoxComponentWrapper = styled(Box)`
  margin-bottom: 40px;
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
  const redirectUri = encodeURIComponent(location.pathname);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpenCreditAnnounce, setIsOpenCreditAnnounce] = useState(false);
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [iconSrc, setIconSrc] = useState('');
  const [price, setPrice] = useState(0);
  const [reviewId, setReviewId] = useState('');
  const [reviewerId, setReviewerId] = useState('');
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
    if (authUserName === '') {
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
      const registerResult = await postRegisterPayment(registerParams);
      const response = await postPayment(params);
      if (!response.data.status) throw err;
      const clientSecret = response.data.client_secret;
      if (!stripe || !clientSecret) return;
      const paymentResult = await stripe.confirmCardPayment(clientSecret);
      if (paymentResult.paymentIntent?.status !== 'succeeded') throw err;
      const newReviews = reviews!.slice();
      for (const item of newReviews) {
        if (item.sort_key === reviewId) {
          item.contents.review.display_body_html =
            registerResult.data.contents.review.body_html;
        }
      }
      gtag.event({
        eventAction: 'payment',
        eventCategory: 'purchase',
        eventLabel: 'purchase',
        value: authUserName,
      });
      setReviews(newReviews);
      setPaymentedList({ ...paymentedList, [reviewId]: true });
      setIsSucceeded(true);
      setIsDisabled(false);
    } catch {
      await deleteRegisterPayment(registerParams);
      alert(errorMessages.PAYMENT_ERROR);
      setIsDisabled(false);
    }
  };

  const renderReviewedItem = (el: CustomReviewTypes, index: number) => {
    console.log(el);

    const name = el.user_profile.display_name;
    const iconSrc = el.user_profile.icon_src;
    const price = el.price;
    const contents = el.contents;
    const title = contents.review.title;
    const date = `${el.create_year}/${el.create_month}/${el.create_day}`;
    const displayBodyHtml = contents.review.display_body_html;
    const remainingLength = el.remaining_length;
    const isSelfReviewItem = el.sort_key === myReviewId;
    const isPaymentFree = el.payment_type === PAYMENT_FREE;
    const sortKey = el.sort_key;
    const reviewerId = el.user_id;
    const isPaymented = paymentedList[sortKey];
    return (
      <Box key={index} component='section' mb={7}>
        <StyledBoxFlex mb={2}>
          <ReviewUser
            name={name}
            date={date}
            userIcon={iconSrc}
            width={'32px'}
            height={'32px'}
          />
          {isSelfReviewItem ? (
            <Price color='#5C6BC0' text='自身のレビュー' />
          ) : isPaymented ? (
            <Price color='#EC576B' text='購入済み' />
          ) : (
            <Price
              color={isPaymentFree ? '#5C6BC0' : '#EC576B'}
              text={isPaymentFree ? 'FREE!!' : `¥${price}`}
            />
          )}
        </StyledBoxFlex>
        <StyledBoxReviewWrapper component='section'>
          <StyledBoxTitleWrapper>
            <h1>{title}</h1>
          </StyledBoxTitleWrapper>
          <StyledBoxComponentWrapper>
            <div className='review-item-wrapper'>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked(displayBodyHtml),
                }}
              />
            </div>
          </StyledBoxComponentWrapper>
        </StyledBoxReviewWrapper>
        {/* ここにコメントをmapで表示させる */}
        {/* エディタを表示 */}
        {(isPaymented || isPaymentFree || isSelfReviewItem) && (
          <StyledBoxComponentWrapper>
            <CommentEditor
              authUserName={authUserName}
              reviewId={sortKey}
              // updateDisplay=
            />
          </StyledBoxComponentWrapper>
        )}
        {(isPaymented || isPaymentFree || isSelfReviewItem) && (
          <Reaction
            authUserName={authUserName}
            sortKey={sortKey}
            postId={postId}
            isReaction={el.is_reaction}
            reactionUsers={el.reaction_users}
            displayName={userProfile ? userProfile.display_name : ''}
            userIcon={userProfile ? userProfile.icon_src : ''}
            setIsOpenSignin={setIsOpenSignin}
          />
        )}
        {!isSelfReviewItem && !isPaymentFree && !isPaymented && (
          <AnnounceOpenReview
            title={title}
            price={price}
            remainingLength={remainingLength}
            reactionUsers={el.reaction_users}
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
        <Box position='relative' padding={2}>
          <CustomLoader width={30} height={30} />
        </Box>
      ) : status ? (
        reviews.length > 0 ? (
          reviews.map((el, index) => renderReviewedItem(el, index))
        ) : isMe ? (
          <RelaxIllustration secondText='リラックスして少し休憩しませんか？' />
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
        width={'30px'}
        height={'30px'}
        isOpenDialog={isOpenPayment}
        closeDialog={() => setIsOpenPayment(false)}
        payment={payment}
      />
      <RegistCreditAnnounceDialog
        redirectUri={redirectUri}
        isOpenDialog={isOpenCreditAnnounce}
        showToggleDialog={() => setIsOpenCreditAnnounce(false)}
      />
      <SigninDialog
        isOpenDialog={isOpenSignin}
        closeDialog={() => setIsOpenSignin(false)}
      />
    </>
  );
};

export const ReviewList = (props: Props) => {
  const promiseStripe = getStripe();

  return (
    <Elements stripe={promiseStripe}>
      <RightBorderTitle text='Review List' fontSize={20} marginBottom={0} />
      {props.isReviewsLoading ? (
        <Box position='relative' padding={2}>
          <CustomLoader width={30} height={30} />
        </Box>
      ) : (
        <Wrapper {...props} />
      )}
    </Elements>
  );
};
