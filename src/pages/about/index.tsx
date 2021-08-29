// import { AboutFirstView } from '@/components/parts/aboutFirstView';
import { SolidLink } from '@/components/atoms/SolidLink';
import { SendIllustration } from '@/components/parts/illustrations/mail-send';
import { ReviewIllustration } from '@/components/parts/illustrations/other-reviews';
import { SellIllustration } from '@/components/parts/illustrations/sell-reviews';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container, Divider } from '@material-ui/core/';
import { alpha } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import AboutKanonCodeSvg from '../../assets/illustration/about-kanoncode.svg';
import TermsSvg from '../../assets/illustration/Accept-terms.svg';
import QuestionsSvg from '../../assets/illustration/Questions.svg';
import SecuritySvg from '../../assets/illustration/Security-pana.svg';
import KanonCodeSvg from '../../assets/logo/kanon-code.svg';

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
      background: ${alpha(theme.palette.primary.main, 0.1)};
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
      background: ${alpha(theme.palette.primary.main, 0.1)};
      position: absolute;
      top: 50px;
      right: -150px;
    }
  }
`;
const StyledBoxAboutTitle = styled(Box)`
  font-size: 32px;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 56px;
  }
`;
const StyledBoxMessage = styled(Box)`
  margin-bottom: 24px;
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
const StyledBoxPhilosophyTitle = styled(Box)`
  margin-bottom: 8px;
  font-size: 32px;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 56px;
  }
`;
const StyledUl = styled('ul')`
  list-style-type: none;
  padding: 0;
`;
const StyledLl = styled('li')`
  margin-bottom: 16px;
`;
const StyledBoxListFlex = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledBoxSubTitle = styled(Box)`
  margin-right: 24px;
  font-weight: bold;
  font-size: 24px;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 48px;
  }
  span {
    color: ${theme.palette.primary.main};
  }
`;
const StyledBoxTrans = styled(Box)`
  color: ${theme.palette.primary.main};
  font-weight: bold;
`;
const StyledBoxSignin = styled(Box)`
  padding: 30px;
  text-align: center;
`;
const StyledLogo = styled(KanonCodeSvg)`
  width: 80%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 80%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 500px;
  }
`;
const StyledAboutKanonCodeSvg = styled(AboutKanonCodeSvg)`
  width: 100%;
  height: auto;
`;
const StyledBoxSinginTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 8px;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 32px;
    margin-bottom: 24px;
  }
`;
const StyledBoxLearnMoreTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
  ${props => props.theme.breakpoints.up('sm')} {
    text-align: left;
    font-size: 32px;
    margin-bottom: 24px;
  }
`;
const StyledBoxBlock = styled(Box)`
  margin-bottom: 24px;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 24px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const StyledBoxSqure = styled(Box)`
  margin: auto;
  border-radius: 4px;
  width: 100%;
  height: 270px;
  background: ${alpha(theme.palette.primary.main, 0.1)};
  margin-bottom: 16px;
  position: relative;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 24px;
    width: 250px;
    height: 200px;
  }
`;
const StyledBoxAbsolute = styled(Box)`
  width: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledQuestionsSvg = styled(QuestionsSvg)`
  width: 100%;
`;
const StyledTermsSvg = styled(TermsSvg)`
  width: 100%;
`;
const StyledSecuritySvg = styled(SecuritySvg)`
  width: 100%;
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

const CircleInSvg = (svg: any, text: string) => {
  return (
    <StyledBoxBlock>
      <StyledBoxSqure>
        <StyledBoxAbsolute>{svg}</StyledBoxAbsolute>
      </StyledBoxSqure>
      <Box textAlign='center'>{text}</Box>
    </StyledBoxBlock>
  );
};

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout
      title='Kanon Code | Kanon Codeについて'
      currentUser={props.currentUser}
    >
      <Container maxWidth='md'>
        <Box mt={10} component='section'>
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
            <StyledAboutKanonCodeSvg />
          </StyledBoxAboutTitleWrapper>
          <Box mb={5}>
            <Divider />
          </Box>
          <Box mb={5}>
            {RequestReview()}
            {SellReviews()}
            {OtherReviews()}
          </Box>
          <Box mb={5}>
            <StyledBoxPhilosophyTitle component='h2'>
              Philosophy
            </StyledBoxPhilosophyTitle>
            <StyledUl>
              <StyledLl>
                <StyledBoxListFlex>
                  <StyledBoxSubTitle>
                    <span>H</span>umility
                  </StyledBoxSubTitle>
                  <StyledBoxTrans>謙虚</StyledBoxTrans>
                </StyledBoxListFlex>
                <Box pl={0.5}>
                  謙虚な姿勢でレビューを受け取りましょう。全ては自分の成長の糧になります。
                </Box>
              </StyledLl>
              <StyledLl>
                <StyledBoxListFlex>
                  <StyledBoxSubTitle>
                    <span>R</span>espect
                  </StyledBoxSubTitle>
                  <StyledBoxTrans>尊敬</StyledBoxTrans>
                </StyledBoxListFlex>
                <Box pl={0.5}>
                  レビュイー・レビュワーともに尊敬を忘れず対人であることを忘れないようにしましょう。
                </Box>
              </StyledLl>
              <StyledLl>
                <StyledBoxListFlex>
                  <StyledBoxSubTitle>
                    <span>T</span>rust
                  </StyledBoxSubTitle>
                  <StyledBoxTrans>信頼</StyledBoxTrans>
                </StyledBoxListFlex>
                <Box pl={0.5}>
                  相手のことを信頼し思いやり健全なコミュニケーションを忘れないようにしましょう。
                </Box>
              </StyledLl>
            </StyledUl>
          </Box>
          <Box mb={5}>
            <StyledBoxSignin>
              <StyledBoxSinginTitle component='h2'>
                さぁ、Kanon Codeへ
              </StyledBoxSinginTitle>
              <Box mb={3}>
                <StyledLogo />
              </Box>
              <SolidLink href='/signin' borderRadius={4}>
                サインイン
              </SolidLink>
            </StyledBoxSignin>
          </Box>
          <Box mb={5}>
            <StyledBoxLearnMoreTitle component='h2'>
              Learn more
            </StyledBoxLearnMoreTitle>
            <StyledBoxFlexWrapper>
              <Link href='/faq'>
                {CircleInSvg(<StyledQuestionsSvg />, 'よくある質問')}
              </Link>
              <Link href='/terms'>
                {CircleInSvg(<StyledTermsSvg />, '利用規約')}
              </Link>
              <Link href='/privacy-policy'>
                {CircleInSvg(<StyledSecuritySvg />, 'プライバシーポリシー')}
              </Link>
            </StyledBoxFlexWrapper>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
