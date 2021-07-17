import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { Tags } from "@/components/atoms/Tags";
import { TagsIcon } from "@/components/atoms/TagsIcon";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  imgWidth: string;
  imgHeight: string;
  iconSrc: string;
  url: string;
  title: string;
  fontSize: number;
  marginBottom: number;
  tagList: string[];
};
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.text.primary};
  text-decoration: none;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;
const StyledBoxWrapper = styled(Box)``;

export const PostedTitle: React.FC<Props> = (props) => {
  return (
    <StyledBoxWrapper>
      <Box display="flex" alignItems="center" ml={1}>
        <Box mr={1}>
          <img
            width={props.imgWidth}
            height={props.imgHeight}
            src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${props.iconSrc}`}
          />
        </Box>
        <Box>
          <Box>
            <Link href={props.url} passHref>
              <StyledAnchor>
                <CustomHeading2
                  fontSize={props.fontSize}
                  marginBottom={props.marginBottom}
                >
                  {props.title}
                </CustomHeading2>
              </StyledAnchor>
            </Link>
          </Box>
          <Box mr={1} component="span">
            <TagsIcon />
          </Box>
          <Tags fontSize={14} marginRight={1} tagArray={props.tagList} />
        </Box>
      </Box>
    </StyledBoxWrapper>
  );
};
