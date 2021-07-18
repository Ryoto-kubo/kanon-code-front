import { CircleElement } from "@/components/atoms/Circle";
import { Price } from "@/components/atoms/Price";
import { PostedTitle } from "@/components/molecules/PostedTitle";
import { PostsTypes } from "@/types/global";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  posts: PostsTypes[];
  imgWidth: string;
  imgHeight: string;
};
const makePostUrl = (profile: any, postId: string) => {
  const displayName = profile.display_name;
  const splitedPostId = postId.split("_").pop();
  return `${displayName}/post/${splitedPostId}`;
};

export const MyPaymentsTable: React.FC<Props> = (props) => {
  return (
    <>
      {props.posts.map((postItem: PostsTypes) => (
        <Box key={uuidv4()}>
          <Box mb={0.5}>
            <Paper>
              <Box p={1}>
                <PostedTitle
                  imgWidth="40px"
                  imgHeight="40px"
                  iconSrc={postItem.posted_contents.target_icon.icon_path}
                  url={makePostUrl(postItem.user_profile, postItem.sort_key)}
                  title={postItem.posted_contents.title}
                  fontSize={16}
                  marginBottom={0}
                  tagList={postItem.posted_contents.tag_list}
                />
              </Box>
            </Paper>
          </Box>
          {postItem.payments.length <= 0 ? (
            <p>まだレビューを購入していません</p>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">値段</TableCell>
                    <TableCell align="left" style={{ minWidth: 150 }}>
                      レビュータイトル
                    </TableCell>
                    <TableCell align="left">レビュワー</TableCell>
                    <TableCell align="left">購入日</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {postItem.payments.map((paymentItem) => (
                    <TableRow key={uuidv4()}>
                      <TableCell align="left">
                        <Price
                          color={"#EC576B"}
                          text={`¥${paymentItem.price}`}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ wordBreak: "break-word", minWidth: 150 }}
                      >
                        {paymentItem.reviewed_contents.review.title}
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
    </>
  );
};
