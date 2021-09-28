import theme from '@/styles/theme';
import { Box, Card, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { IconLaravel } from '../svg/programing/IconLaravel';
import { IconNode } from '../svg/programing/IconNode';
import { IconReact } from '../svg/programing/IconReact';

const StyledBoxWapper = styled(Box)``;
const StyledBoxPageTitle = styled(Box)`
  font-size: 23px;
  margin-bottom: 24px;
  line-height: 1.7;
  text-align: center;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 40px;
  }
`;
const StyledGrid = styled(Grid)`
  display: flex;
`;
const StyledCard = styled(Card)`
  margin-bottom: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledBoxDescriptionWrapper = styled(Box)`
  background: #ffffff;
  padding: 16px;
  flex-grow: 1;
`;
const StyledBoxContentsTitle = styled(Box)`
  color: ${theme.palette.primary.main};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const StyledBoxDescription = styled(Box)`
  line-height: 1.7;
`;
const StyledBoxIconWrapper = styled(Box)`
  text-align: center;
  padding: 16px;
`;

export const TopCanDo: React.FC = () => {
  return (
    <StyledBoxWapper>
      <StyledBoxPageTitle component='h2'>
        Kanon Codeだからできること。
      </StyledBoxPageTitle>
      <Grid spacing={3} container alignItems='stretch'>
        <StyledGrid item xs={12} sm={4} md={4} lg={4}>
          <StyledCard>
            <StyledBoxDescriptionWrapper>
              <StyledBoxContentsTitle>
                レビュー依頼はずっと無料
              </StyledBoxContentsTitle>
              <StyledBoxDescription component='p'>
                レビュー依頼を無料で投稿することができます。
                <br />
                もらったレビューに対して質問をし、知見を増やしていけるのもKanon
                Codeの一つの魅力です。分からない部分はどんどん質問して知見や技術に変えていきましょう。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
            <StyledBoxIconWrapper>
              <IconNode width={100} height={100} />
            </StyledBoxIconWrapper>
          </StyledCard>
        </StyledGrid>
        <StyledGrid item xs={12} sm={4} md={4} lg={4}>
          <StyledCard>
            <StyledBoxDescriptionWrapper>
              <StyledBoxContentsTitle>
                レビューを販売できる
              </StyledBoxContentsTitle>
              <StyledBoxDescription component='p'>
                レビューを有料で販売することができます。
                <br />
                もちろん無料でのレビューも可能です。文字数やボリュームで有料か
                無料かを自身で選びレビューしてみてください。あなたのレビューを待っている人がいます。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
            <StyledBoxIconWrapper>
              <IconReact width={100} height={100} />
            </StyledBoxIconWrapper>
          </StyledCard>
        </StyledGrid>
        <StyledGrid item xs={12} sm={4} md={4} lg={4}>
          <StyledCard>
            <StyledBoxDescriptionWrapper>
              <StyledBoxContentsTitle>
                自身以外へのレビューも見れる
              </StyledBoxContentsTitle>
              <StyledBoxDescription component='p'>
                自身以外に宛てたレビューも見ることができます。
                <br />
                全ての無料レビューは誰でも閲覧でき、有料レビューは誰でも購入が可能です。
                様々なレビューを閲覧できるKanon
                Codeは、技術が集まるプラットフォームです。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
            <StyledBoxIconWrapper>
              <IconLaravel width={100} height={100} />
            </StyledBoxIconWrapper>
          </StyledCard>
        </StyledGrid>
      </Grid>
    </StyledBoxWapper>
  );
};
