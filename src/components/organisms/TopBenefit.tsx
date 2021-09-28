import { Box } from '@material-ui/core';
import styled from 'styled-components';

const StyledBoxWapper = styled(Box)`
  background: #162b48;
`;
const StyledBoxTitleWrapper = styled(Box)`
  padding: 40px 16px;
`;
const StyledBoxPageTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 24px;
  line-height: 1.7;
  text-align: center;
  display: inline-block;
  width: 100%;
  color: #ffffff;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 40px;
  }
`;
const StyledBoxDescriptionWrapper = styled(Box)`
  line-height: 1.8;
  text-align: center;
  font-size: 16px;
  max-width: 530px;
  margin: auto;
  color: #ffffff;
  font-weight: bold;
`;

export const TopBenefit: React.FC = () => {
  return (
    <StyledBoxWapper>
      <StyledBoxTitleWrapper>
        <StyledBoxPageTitle component='h2'>
          エンジニアに必要な能力。
          <br />
          それは、分からないことを言葉にする力。
        </StyledBoxPageTitle>
        <StyledBoxDescriptionWrapper>
          伝わりやすく、かつ簡潔に質問をする。
          <br />
          自分の中で曖昧になっている部分を言葉にする能力は、エンジニアにとって大切な能力です。
          コードレビューでは、コードをただ記載するだけではなく、実装背景や困っている箇所、重点的に見て欲しい箇所を言葉にする必要があります。
          これらは確かに大変な作業ですが、確実にあなたの技術力を上げる近道になるでしょう。
          コードレビューを依頼すると同時にKanon
          Codeでエンジニアスキルをアップさせてみませんか？
        </StyledBoxDescriptionWrapper>
      </StyledBoxTitleWrapper>
    </StyledBoxWapper>
  );
};
