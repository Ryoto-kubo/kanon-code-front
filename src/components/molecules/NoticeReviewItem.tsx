import { CircleElement } from "@/components/atoms/Circle";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  reviewerName: string;
  name: string;
  iconSrc: string;
  postId: string;
  date: string;
  isRead: boolean;
  width: string;
  height: string;
};

const StyledWrapper = styled(Box)`
  display: felx;
`;
const StyledAnchor = styled(`a`)`
  display: inline-block;
  font-weight: bold;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
const StyledMessageWrapper = styled(Box)`
  width: 200px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin-left: 8px;
  line-height: 1.7;
  font-size: 13px;
`;
const StyledBoxDate = styled(Box)`
  font-size: 12px;
`;

export const NoticeReviewItem: React.FC<Props> = (props) => {
  console.log(props);
  const postId = props.postId.split("_")[1];

  return (
    <StyledWrapper>
      <CircleElement width={`${props.width}`} height={`${props.height}`}>
        <Link href={`/${props.reviewerName}`} passHref>
          <a>
            <img
              src={props.iconSrc}
              style={{
                borderRadius: "50px",
                width: `${props.width}`,
                height: `${props.height}`,
              }}
            />
          </a>
        </Link>
      </CircleElement>
      <StyledMessageWrapper>
        <Box>
          <Link href={`/${props.reviewerName}`} passHref>
            <StyledAnchor>{props.reviewerName}</StyledAnchor>
          </Link>
          さんが
          <Link href={`/${props.name}/post/${postId}`} passHref>
            <StyledAnchor>「{props.title}」</StyledAnchor>
          </Link>
          にレビューしました。
        </Box>
        <StyledBoxDate>{props.date}</StyledBoxDate>
      </StyledMessageWrapper>
    </StyledWrapper>
  );
};
