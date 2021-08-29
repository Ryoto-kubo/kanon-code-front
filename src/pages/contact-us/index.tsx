import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container } from '@material-ui/core/';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledBoxPageTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 8px;
`;
const StyledBoxBlock = styled(Box)`
  margin-bottom: 24px;
`;
const StyledUl = styled('ul')`
  line-height: 2;
`;
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.primary.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout
      title='Kanon Code | 各種お問い合わせ'
      currentUser={props.currentUser}
    >
      <Container maxWidth='md'>
        <Box my={10} component='section'>
          <StyledBoxPageTitle component='h1'>
            各種お問い合わせ
          </StyledBoxPageTitle>
          <StyledBoxBlock>
            <StyledUl>
              <li>
                <Link href='https://forms.gle/G5XBqS8RAmRJJ9616' passHref>
                  <StyledAnchor target='_blank' rel='noopener'>
                    不明点や改善点など一般的なお問い合わせはこちら
                  </StyledAnchor>
                </Link>
              </li>
              <li>
                <Link href='https://forms.gle/msLBr6W1pAKomaA17' passHref>
                  <StyledAnchor target='_blank' rel='noopener'>
                    返金申請のお問い合わせはこちら
                  </StyledAnchor>
                </Link>
              </li>
              <li>
                <Link href='https://forms.gle/2LVxDAKcBHRJhLTs9' passHref>
                  <StyledAnchor target='_blank' rel='noopener'>
                    振り込み状況のご確認または振り込みキャンセルのお問い合わせはこちら
                  </StyledAnchor>
                </Link>
              </li>
            </StyledUl>
          </StyledBoxBlock>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
