import theme from "@/styles/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  marginRight: number;
  tagArray: Array<string>;
  color?: string;
}

const StyledSpan = styled.span<
  Pick<Props, "fontSize" | "marginRight" | "color">
>`
  font-size: ${({ fontSize }) => fontSize}px;
  margin-right: ${({ marginRight }) => marginRight * 8}px;
  color: ${theme.palette.primary.main};
  word-break: break-all;
`;

const StyledAnchor = styled(`a`)`
  color: ${theme.palette.primary.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Tags: React.FC<Props> = (props) => {
  let list = [];
  for (const index in props.tagArray) {
    list.push(
      <Link
        key={index}
        href={{
          pathname: "/search",
          query: { keyword: props.tagArray[index] },
        }}
        passHref
      >
        <StyledAnchor>
          <StyledSpan
            key={index}
            fontSize={props.fontSize}
            marginRight={props.marginRight}
          >
            #{props.tagArray[index]}
          </StyledSpan>
        </StyledAnchor>
      </Link>
    );
  }
  return <>{list}</>;
};
