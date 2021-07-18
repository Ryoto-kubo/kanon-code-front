import { CircleElement } from "@/components/atoms/Circle";
import { Price } from "@/components/atoms/Price";
import { PostedTitle } from "@/components/molecules/PostedTitle";
import { ReviewContentsDialog } from "@/components/parts/reviewContentsDialog";
import {
  PaymentedTypes,
  PostsTypesInPayments,
  ReviewContentsTypes,
  UserProfileTypes,
} from "@/types/global";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  posts: PostsTypesInPayments[];
  imgWidth: string;
  imgHeight: string;
};

const createContents = () => {
  return {
    review: {
      title: "",
      value: "",
      body_html: "",
      display_body_html: "",
    },
  };
};
const createProfile = () => {
  return {
    display_name: "",
    github_name: "",
    icon_src: "",
    introduction: "",
    position_type: 0,
    price: 0,
    skils: [
      {
        language: "",
        years_experiences: 0,
      },
    ],
    twitter_name: "",
    web_site: "",
  };
};

export const MyPaymentsTable: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState<{
    contents: ReviewContentsTypes;
    profile: UserProfileTypes;
    date: string;
  }>({
    contents: createContents(),
    profile: createProfile(),
    date: "",
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
      {props.posts.map((postItem: PostsTypesInPayments) => (
        <Box key={uuidv4()}>
          <Paper>
            <Box p={1}>
              <PostedTitle
                imgWidth="40px"
                imgHeight="40px"
                iconSrc={postItem.posted_contents.target_icon.icon_path}
                url={postItem.url}
                title={postItem.posted_contents.title}
                fontSize={16}
                marginBottom={0}
                tagList={postItem.posted_contents.tag_list}
              />
            </Box>
          </Paper>
          {postItem.payments.length <= 0 ? (
            <Box mt={1}>
              <p>まだレビューを購入していません</p>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{ width: 100, maxWidth: 100 }}
                    >
                      値段
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: 150 }}>
                      レビュータイトル
                    </TableCell>
                    <TableCell align="left">レビュワー</TableCell>
                    <TableCell align="left">購入日</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {postItem.payments.map((paymentItem: PaymentedTypes) => (
                    <TableRow key={uuidv4()}>
                      <TableCell
                        align="left"
                        style={{ width: 100, maxWidth: 100 }}
                      >
                        <Price
                          color={"#EC576B"}
                          text={`¥${paymentItem.price}`}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ wordBreak: "break-word", minWidth: 150 }}
                      >
                        <Button
                          onClick={() =>
                            showContentsDialog(
                              paymentItem.reviewed_contents,
                              paymentItem.reviewer_user_profile,
                              paymentItem.date
                            )
                          }
                        >
                          {paymentItem.reviewed_contents.review.title}
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <CircleElement
                          width={`${props.imgWidth}`}
                          height={`${props.imgHeight}`}
                        >
                          <Link
                            href={`/${paymentItem.reviewer_user_profile.display_name}`}
                            passHref
                          >
                            <a>
                              <img
                                src={paymentItem.reviewer_user_profile.icon_src}
                                style={{
                                  borderRadius: "50px",
                                  width: `${props.imgWidth}`,
                                  height: `${props.imgHeight}`,
                                }}
                              />
                            </a>
                          </Link>
                        </CircleElement>
                      </TableCell>
                      <TableCell align="left">{postItem.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ))}
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
