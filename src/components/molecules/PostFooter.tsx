import { CircleElement } from "@/components/atoms/Circle";
import { ParagraphText } from "@/components/atoms/ParagraphText";
import theme from "@/styles/theme";
import { Box } from "@material-ui/core/";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  date: string;
  userIcon: string;
}

const StyledAnchor = styled(`a`)`
  color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const PostFooter: React.FC<Props> = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <CircleElement>
        <Link href={props.name} passHref>
          <a>
            <img src={props.userIcon} style={{ borderRadius: "50px" }} />
          </a>
        </Link>
      </CircleElement>
      <Box>
        <Link href={props.name} passHref>
          <StyledAnchor>
            <Box fontWeight="bold" component="p">
              {props.name}
            </Box>
          </StyledAnchor>
        </Link>
        <ParagraphText variant="body2" component="p" color="textSecondary">
          {props.date}
        </ParagraphText>
      </Box>
    </Box>
  );
};
