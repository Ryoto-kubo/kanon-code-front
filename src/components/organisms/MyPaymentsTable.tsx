import { CircleElement } from '@/components/atoms/Circle';
import { Price } from '@/components/atoms/Price';
import { ReviewContentsDialog } from '@/components/parts/reviewContentsDialog';
import theme from '@/styles/theme';
import {
  PaymentedTypes,
  PostsTypesInPayments,
  ReviewContentsTypes,
  UserProfileTypes,
} from '@/types/global';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  posts: PostsTypesInPayments[];
  imgWidth: string;
  imgHeight: string;
};

const StyledAnchor = styled(`a`)`
  color: ${theme.palette.text.primary};
  text-decoration: none;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
  display: block;
  ${props => props.theme.breakpoints.up('md')} {
    display: flex;
    align-items: center;
  }
`;

const StyledBoxNameWrapper = styled(Box)`
  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 8px;
  }
`;

const createContents = () => {
  return {
    review: {
      title: '',
      value: '',
      body_html: '',
      display_body_html: '',
    },
  };
};
const createProfile = () => {
  return {
    display_name: '',
    github_name: '',
    icon_src: '',
    introduction: '',
    position_type: 0,
    price: 0,
    skils: [
      {
        language: '',
        years_experiences: 0,
      },
    ],
    twitter_name: '',
    web_site: '',
  };
};

export const MyPaymentsTable: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState<{
    contents: ReviewContentsTypes;
    profile: UserProfileTypes;
    date: string;
  }>({
    contents: createContents(),
    profile: createProfile(),
    date: '',
  });

  const showContentsDialog = (
    contents: ReviewContentsTypes,
    profile: UserProfileTypes,
    date: string
  ) => {
    setIsOpen(true);
    setReview({
      ...review,
      contents: contents,
      profile: profile,
      date: date,
    });
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      {props.posts.length <= 0 ? (
        <Box mt={1}>
          <p>まだレビューを購入していません</p>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='left'>レビュータイトル</TableCell>
                <TableCell align='left'>レビュワー</TableCell>
                <TableCell align='left'>日付</TableCell>
                <TableCell align='left'>価格</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.posts.map((postItem: PostsTypesInPayments) =>
                postItem.payments.map((paymentItem: PaymentedTypes) => (
                  <TableRow key={uuidv4()}>
                    <TableCell
                      align='left'
                      style={{
                        wordBreak: 'break-word',
                        width: 450,
                        minWidth: 150,
                        maxWidth: 450,
                      }}
                    >
                      <Button
                        onClick={() =>
                          showContentsDialog(
                            paymentItem.reviewed_contents,
                            paymentItem.reviewer_user_profile,
                            paymentItem.date
                          )
                        }
                        color={'primary'}
                      >
                        {paymentItem.reviewed_contents.review.title}
                      </Button>
                    </TableCell>
                    <TableCell align='left'>
                      <CircleElement
                        width={`${props.imgWidth}`}
                        height={`${props.imgHeight}`}
                      >
                        <Link
                          href={`/${paymentItem.reviewer_user_profile.display_name}`}
                          passHref
                        >
                          <StyledAnchor>
                            <img
                              src={paymentItem.reviewer_user_profile.icon_src}
                              style={{
                                borderRadius: '50px',
                                width: `${props.imgWidth}`,
                                height: `${props.imgHeight}`,
                                margin: 'auto',
                              }}
                            />
                            <StyledBoxNameWrapper component='span'>
                              {paymentItem.reviewer_user_profile.display_name}
                            </StyledBoxNameWrapper>
                          </StyledAnchor>
                        </Link>
                      </CircleElement>
                    </TableCell>
                    <TableCell align='left'>{postItem.date}</TableCell>
                    <TableCell
                      align='left'
                      style={{ width: 100, maxWidth: 100 }}
                    >
                      <Price color={'#EC576B'} text={`¥${paymentItem.price}`} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ReviewContentsDialog
        contents={review.contents}
        profile={review.profile}
        date={review.date}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </>
  );
};
