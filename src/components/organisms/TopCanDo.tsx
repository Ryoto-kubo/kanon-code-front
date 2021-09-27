import theme from '@/styles/theme';
import { Box, Grid, Paper } from '@material-ui/core';
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
const StyledPaper = styled(Paper)`
  margin-bottom: 8px;
  padding: 16px;
`;
const StyledBoxIconWrapper = styled(Box)`
  text-align: center;
  padding: 16px;
`;
const StyledBoxDescriptionWrapper = styled(Box)`
  background: #ffffff;
  min-height: 110px;
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

export const TopCanDo: React.FC = () => {
  return (
    <StyledBoxWapper>
      <StyledBoxPageTitle component='h2'>
        Kanon Codeだからできること。
      </StyledBoxPageTitle>
      <Grid spacing={3} container>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <StyledPaper>
            <StyledBoxDescriptionWrapper>
              <StyledBoxContentsTitle>
                レビュー依頼はずっと無料
              </StyledBoxContentsTitle>
              <StyledBoxDescription component='p'>
                レビュー依頼を無料で投稿することができます。
                <br />
                更に、もらったレビューに対して質問をし、知見を増やしていけるのもKanon
                Codeの一つの魅力です。分からない部分はどんどん質問して知見に変えていきましょう。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
            <Box textAlign='center' pt={2}>
              <IconNode width={100} height={100} />
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <StyledPaper>
            <StyledBoxDescriptionWrapper>
              <StyledBoxContentsTitle>
                レビューを販売できる
              </StyledBoxContentsTitle>
              <StyledBoxDescription component='p'>
                自身のレビューを有料で販売することができます。
                <br />
                もちろん無料でのレビューも可能です。文字数やボリュームで有料か
                無料かを自身で選びレビューしてみてください。あなたのレビューを待っている人がいます。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
            <Box textAlign='center' pt={2}>
              <IconReact width={100} height={100} />
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <StyledPaper>
            <StyledBoxDescriptionWrapper>
              <StyledBoxContentsTitle>考え中</StyledBoxContentsTitle>
              <StyledBoxDescription component='p'>
                自身のレビューを有料で販売することができます。
                <br />
                もちろん無料でのレビューも可能です。文字数やボリュームで有料か
                無料かを自身で選びレビューしてみてください。あなたのレビューを待っている人がいます。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
            <Box textAlign='center' pt={2}>
              <IconLaravel width={100} height={100} />
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledBoxWapper>
  );
};
