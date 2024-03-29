import { GoSignin } from '@/components/organisms/GoSignin';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container, Divider } from '@material-ui/core/';
import { alpha } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import About01Svg from '../../assets/illustration/about/about-01.svg';
import About02Svg from '../../assets/illustration/about/about-02.svg';
import About03Svg from '../../assets/illustration/about/about-03.svg';
import AboutKanonCodeSvg from '../../assets/illustration/about/about-kanoncode.svg';
import TermsSvg from '../../assets/illustration/Accept-terms.svg';
import QuestionsSvg from '../../assets/illustration/Questions.svg';
import SecuritySvg from '../../assets/illustration/Security-pana.svg';

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
  margin-bottom: 16px;
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
const StyledAboutKanonCodeSvg = styled(AboutKanonCodeSvg)`
  width: 100%;
  height: auto;
`;
const StyledAbout01Svg = styled(About01Svg)`
  width: 100%;
  height: auto;
`;
const StyledAbout02Svg = styled(About02Svg)`
  width: 100%;
  height: auto;
`;
const StyledAbout03Svg = styled(About03Svg)`
  width: 100%;
  height: auto;
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
    width: 220px;
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
    <StyledBoxFlexWrapper mb={5}>
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
        <StyledAbout01Svg />
      </StyledBoxWidth>
    </StyledBoxFlexWrapper>
  );
};

const SellReviews = () => {
  return (
    <StyledBoxReversFlexWrapper mb={5}>
      <StyledBoxWidth>
        <StyledBoxContentsTitle component='h2'>
          Sell reviews
        </StyledBoxContentsTitle>
        <StyledBoxMessage>
          レビューを販売してみましょう。
          <br />
          あなたのレビューが、誰かの成長に繋がり知らないどこかで優れたプロジェクトへ形を変えることでしょう。
          <br />
          また、レビューは依頼者だけが成長するわけではありません。レビューする側もまた成長するのです。
          <br />
          もちろん無料での販売もできます。
        </StyledBoxMessage>
      </StyledBoxWidth>
      <StyledBoxWidth>
        <StyledAbout02Svg />
      </StyledBoxWidth>
    </StyledBoxReversFlexWrapper>
  );
};

const OtherReviews = () => {
  return (
    <StyledBoxFlexWrapper mb={5}>
      <StyledBoxWidth>
        <StyledBoxContentsTitle component='h2'>
          Purchase other user’s reviews
        </StyledBoxContentsTitle>
        <StyledBoxMessage>
          自身の投稿以外のレビューも購入してみましょう。
          <br />
          他の方が書いたコードを読み何をしているのかを理解し、どのような部分を問題だと思っているのかを理解することもまた、自身の成長に繋がります。
          <br />
          Kanon Codeを自身の成長のために思い切り利用してください。
        </StyledBoxMessage>
      </StyledBoxWidth>
      <StyledBoxWidth>
        <StyledAbout03Svg />
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
      title='Kanon Codeについて | Kanon Code'
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
            <GoSignin />
          </Box>
          <Box pb={8}>
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
