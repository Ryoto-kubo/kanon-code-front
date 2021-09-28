import { Box, Grid, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { IconFlutter } from '../svg/programing/IconFlutter';
import { IconHtml } from '../svg/programing/IconHtml';
import { IconNext } from '../svg/programing/IconNext';
import { IconTypeScript } from '../svg/programing/IconTypeScript';

const StyledBoxWapper = styled(Box)``;
const StyledBoxPageTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 8px;
  line-height: 1.7;
  text-align: center;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 40px;
  }
`;
const StyledBoxSubTitle = styled(Box)`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.8;
  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 16px;
  }
`;
const StyledPaper = styled(Paper)`
  margin-bottom: 8px;
  background: #fafafa;
`;
const StyledBoxIconWrapper = styled(Box)`
  text-align: center;
  padding: 16px;
`;
const StyledBoxDescriptionWrapper = styled(Box)`
  background: #ffffff;
`;
const StyledBoxDescription = styled(Box)`
  padding: 8px;
  line-height: 1.8;
`;

export const TopSituation: React.FC = () => {
  return (
    <StyledBoxWapper>
      <Box mb={4} textAlign='center'>
        <StyledBoxPageTitle component='h2'>
          コードレビューの言語制限？
          <br />
          いいえ、制限などありません。
        </StyledBoxPageTitle>
        <StyledBoxSubTitle component='p'>
          HTMLやCSS、フロント言語やサーバー言語。
          <br />
          あらゆる言語のレビュー依頼に対応しています。
        </StyledBoxSubTitle>
      </Box>
      <Grid spacing={4} container>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StyledPaper>
            <StyledBoxIconWrapper>
              <IconHtml width={100} height={100} />
            </StyledBoxIconWrapper>
            <StyledBoxDescriptionWrapper>
              <StyledBoxDescription component='p'>
                正しく理解し適切にマークアップすることは、簡単なことではありません。
                <br />
                セマンティックを意識しコーディングが行えているか、レビュー依頼を出してみるのも良いでしょう。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StyledPaper>
            <Box textAlign='center' p={2}>
              <IconNext width={100} height={100} />
            </Box>
            <StyledBoxDescriptionWrapper>
              <StyledBoxDescription component='p'>
                フロントエンドの進化はとても早くトレンドの移り変わりも激しいです。
                <br />
                実装しているコードが本当に最適かどうか、
                実装背景も記載すると確実な回答が得られることでしょう。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StyledPaper>
            <Box textAlign='center' p={2}>
              <IconTypeScript width={100} height={100} />
            </Box>
            <StyledBoxDescriptionWrapper>
              <StyledBoxDescription component='p'>
                デファクトスタンダードになりつつあるMicroSoftから生まれたTypeScript。
                <br />
                適切な型を用いたコーディングができるように、レビュー依頼を出すのも一つの使い方です。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StyledPaper>
            <Box textAlign='center' p={2}>
              <IconFlutter width={100} height={100} />
            </Box>
            <StyledBoxDescriptionWrapper>
              <StyledBoxDescription component='p'>
                クロスプラットフォーム対応のアプリケーションフレームワーク「Flutter」
                <br />
                世界的に注目を集め始めているフレームワークを一足先に自分のものにしてしまいましょう。
              </StyledBoxDescription>
            </StyledBoxDescriptionWrapper>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledBoxWapper>
  );
};
