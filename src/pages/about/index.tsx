// import { AboutFirstView } from '@/components/parts/aboutFirstView';
import { SendIllustration } from '@/components/parts/illustrations/mail-send';
import { ReviewIllustration } from '@/components/parts/illustrations/other-reviews';
import { SellIllustration } from '@/components/parts/illustrations/sell-reviews';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container, Divider } from '@material-ui/core/';
import { fade } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledBoxAboutTitleWrapper = styled(Box)`
  position: relative;
  ${props => props.theme.breakpoints.up('lg')} {
    &::before {
      display: block;
      content: '';
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: ${fade(theme.palette.primary.main, 0.1)};
      position: absolute;
      top: -40px;
      left: -100px;
    }
    &::after {
      display: block;
      content: '';
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: ${fade(theme.palette.primary.main, 0.1)};
      position: absolute;
      top: 50px;
      right: -150px;
    }
  }
`;
const StyledBoxAboutTitle = styled(Box)`
  font-size: 32px;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 48px;
  }
`;
const StyledBoxMessage = styled(Box)`
  font-size: 14px;
  line-height: 1.8;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 16px;
  }
`;
const StyledBoxContentsTitle = styled(Box)`
  margin-bottom: 8px;
  font-size: 24px;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 28px;
  }
`;
const StyledBoxFlexWrapper = styled(Box)`
  display: block;
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxReversFlexWrapper = styled(Box)`
  display: block;
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;
const StyledBoxWidth = styled(Box)`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: calc((100% - 50px) / 2);
  }
`;

const RequestReview = () => {
  return (
    <StyledBoxFlexWrapper mb={3}>
      <StyledBoxWidth>
        <StyledBoxContentsTitle component='h2'>
          Request a review
        </StyledBoxContentsTitle>
        <StyledBoxMessage>
          レビュー依頼を投稿しましょう。
          <br />
          自分以外の誰かにコードを見てもらうことにより、たくさんの知見が手に入ることでしょう。
          <br />
          1人では得られることができなかった知見をどんどん吸収していきましょう。
        </StyledBoxMessage>
      </StyledBoxWidth>
      <StyledBoxWidth>
        <SendIllustration />
      </StyledBoxWidth>
    </StyledBoxFlexWrapper>
  );
};

const SellReviews = () => {
  return (
    <StyledBoxReversFlexWrapper mb={3}>
      <StyledBoxWidth>
        <StyledBoxContentsTitle component='h2'>
          Sell reviews
        </StyledBoxContentsTitle>
        <StyledBoxMessage>
          レビュー依頼を投稿しましょう。
          <br />
          自分以外の誰かにコードを見てもらうことにより、たくさんの知見が手に入ることでしょう。
          <br />
          1人では得られることができなかった知見をどんどん吸収していきましょう。
        </StyledBoxMessage>
      </StyledBoxWidth>
      <StyledBoxWidth>
        <SellIllustration />
      </StyledBoxWidth>
    </StyledBoxReversFlexWrapper>
  );
};

const OtherReviews = () => {
  return (
    <StyledBoxFlexWrapper mb={3}>
      <StyledBoxWidth>
        <StyledBoxContentsTitle component='h2'>
          Purchase other user’s reviews
        </StyledBoxContentsTitle>
        <StyledBoxMessage>
          レビュー依頼を投稿しましょう。
          <br />
          自分以外の誰かにコードを見てもらうことにより、たくさんの知見が手に入ることでしょう。
          <br />
          1人では得られることができなかった知見をどんどん吸収していきましょう。
        </StyledBoxMessage>
      </StyledBoxWidth>
      <StyledBoxWidth>
        <ReviewIllustration />
      </StyledBoxWidth>
    </StyledBoxFlexWrapper>
  );
};

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout
      title='Kanon Code | Kanon Codeについて'
      currentUser={props.currentUser}
    >
      <Container maxWidth='md'>
        <Box mt={10}>
          <StyledBoxAboutTitleWrapper mb={5}>
            <StyledBoxAboutTitle component='h1' mb={2}>
              Bringing code review
              <br />
              to all engineers.
            </StyledBoxAboutTitle>
            <StyledBoxMessage component='p'>
              「全てのエンジニアにコードレビューを。」
              <br />
              Kanon
              Codeはこのような思いから生まれました。エンジニアの成長を加速させるのは、自身の努力と第三者からの知見。
              <br />
              成長したいと願い日々努力を惜しまないエンジニアのために、誰でも気軽にコードレビューをもらえるサービスを作りました。
            </StyledBoxMessage>
          </StyledBoxAboutTitleWrapper>
          <Box mb={5}>
            <Divider />
          </Box>
          {RequestReview()}
          {SellReviews()}
          {OtherReviews()}
          {/* <StyledBoxFirstView>
            <AboutFirstView width={50} height={50} />
          </StyledBoxFirstView> */}
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
