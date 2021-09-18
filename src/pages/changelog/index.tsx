import { ParagraphText } from '@/components/atoms/ParagraphText';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container, Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core/';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledBoxPageTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 24px;
`;
const StyledBoxWrapper = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`;
const StyledBoxContentWrapper = styled(Box)`
  padding: 16px;
  padding-bottom: 8px;
`;
const StyledTitle = styled('h2')`
  font-size: 16px;
  margin-bottom: 8px;
`;
const StyledAnchor = styled('a')`
  color: ${theme.palette.text.primary};
  text-decoration: none;
`;

const articles = [
  {
    title: 'Kanon CodeのUpdate情報 【募集中の表示】 - vol-01',
    url: 'https://note.com/kanon_code/n/n0f9fe9fd8f89',
    date: '2021/09/05',
  },
  {
    title: 'Kanon CodeのUpdate情報 【OGPの表示】 - vol-02',
    url: 'https://note.com/kanon_code/n/n519fa674ea42',
    date: '2021/09/13',
  },
  {
    title: 'Kanon CodeのUpdate情報 【予算の設定】 - vol-03',
    url: 'https://note.com/kanon_code/n/nbeaf2bc4cb4d',
    date: '2021/09/14',
  },
];

const RenderArticle = (title: string, url: string, date: string) => {
  return (
    <StyledBoxWrapper>
      <StyledAnchor href={url} target='_blank' rel='noopener'>
        <Image
          src='/images/note-eyecatch.png'
          alt='noteのアイキャッチ画像'
          width='auto'
          height='auto'
        />
        <StyledBoxContentWrapper>
          <StyledTitle>{title}</StyledTitle>
          <Box textAlign='right'>
            <ParagraphText variant='body2' component='p' color='textSecondary'>
              {date}
            </ParagraphText>
          </Box>
        </StyledBoxContentWrapper>
      </StyledAnchor>
    </StyledBoxWrapper>
  );
};

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout title='Kanon Code | Change logs' currentUser={props.currentUser}>
      <Container maxWidth='md'>
        <Box my={10} pb={5} component='section'>
          <StyledBoxPageTitle component='h1'>Changelog</StyledBoxPageTitle>
          <Grid spacing={3} container>
            {articles.map(el => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                <Paper>{RenderArticle(el.title, el.url, el.date)}</Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
