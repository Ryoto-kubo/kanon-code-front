import { articles } from '@/articles';
import { ParagraphText } from '@/components/atoms/ParagraphText';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { alpha, Box, Container, Paper } from '@material-ui/core';
// import { Grid } from '@material-ui/core/';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

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
const StyledSection = styled('section')`
  font-size: 0.95rem;
  padding-bottom: 1.5rem;
  padding-left: 44px;
  position: relative;
  line-height: 1.7;
  &.first::before {
    top: 7px;
  }
  &::before {
    content: '';
    position: absolute;
    background: ${alpha(theme.palette.primary.light, 0.3)};
    width: 3px;
    left: 9px;
    top: 0px;
    bottom: 0;
  }
`;
const StyledTime = styled('time')`
  font-weight: 700;
  display: block;
  position: relative;
  font-size: 18px;
  margin-bottom: 8px;
  &::before {
    position: absolute;
    content: '';
    left: -42px;
    top: 7px;
    width: 17px;
    height: 17px;
    background: ${alpha(theme.palette.primary.light, 1)};
    border-radius: 50%;
    border: 3px solid #fff;
  }
`;
const StyledUpdate = styled(Box)`
  border-radius: 4px;
  background: ${theme.palette.primary.main};
  color: #ffffff;
  font-weight: bold;
  padding: 2px 12px;
  display: inline-block;
  font-size: 12px;
`;

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

const UpdateItem = () => {
  return <StyledUpdate>Update</StyledUpdate>;
};

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout title='Change logs | Kanon Code' currentUser={props.currentUser}>
      <Container maxWidth='md'>
        <Box my={10} pb={5} component='section'>
          <StyledBoxPageTitle component='h1'>Changelog</StyledBoxPageTitle>
          {articles.map(el => (
            <StyledSection className={el.className} key={el.key}>
              <StyledTime dateTime={el.date} className='time-wrapper'>
                {el.date}
              </StyledTime>
              <Box mb={2}>{UpdateItem()}</Box>
              {el.hasNote ? (
                <Box mb={2} maxWidth='350px' width='100%'>
                  <Paper>{RenderArticle(el.title, el.url, el.date)}</Paper>
                </Box>
              ) : (
                <StyledTitle>{el.title}</StyledTitle>
              )}
              <Box mb={1}>
                <ParagraphText
                  variant='body2'
                  component='p'
                  color='textSecondary'
                >
                  {el.desciption}
                </ParagraphText>
              </Box>
            </StyledSection>
          ))}
          <Box mt={1} fontWeight='bold'>
            <ParagraphText variant='body2' component='p' color='textSecondary'>
              No more updatelog
            </ParagraphText>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
