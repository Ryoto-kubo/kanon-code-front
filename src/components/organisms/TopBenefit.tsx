import { Box } from '@material-ui/core';
import styled from 'styled-components';

const StyledBoxWapper = styled(Box)`
  background: #122239;
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
  ${props => props.theme.breakpoints.up('md')} {
    font-size: 32px;
  }
`;
const StyledBoxDescriptionWrapper = styled(Box)`
  line-height: 1.7;
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
          それは、分からない部分を言葉にする力。
        </StyledBoxPageTitle>
        <StyledBoxDescriptionWrapper>
          伝わりやすく、かつ簡潔に質問をする。
          <br />
          自分の中で曖昧になっている部分を言葉にする能力は、エンジニアにとって大切な能力です。
          コードレビューでは、コードをただ記載するだけではなく、実装背景や困っている箇所、重点的に見て欲しい箇所を言葉にする必要があります。
          確かに大変な作業ですが、コードレビューを依頼すると同時にKanon
          Codeで言語化スキルもアップさせてみませんか？
        </StyledBoxDescriptionWrapper>
      </StyledBoxTitleWrapper>
    </StyledBoxWapper>
  );
};
