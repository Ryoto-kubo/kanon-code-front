import theme from "@/styles/theme";
import { Box } from "@material-ui/core/";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  href: string;
  borderRadius: number;
}

const StyledSolidLink = styled.a`
  color: #ffffff;
  font-weight: bold;
  // min-width: 100px;
  text-align: center;
  display: inline-block;
  padding: 5px 16px;
  text-decoration: none;
  display: inlne-block;
  // background: ${theme.palette.primary.main};
  ${(props) => props.theme.breakpoints.up("sm")} {
    min-width: 140px;
  }
`;
const StyledBox = styled(Box)`
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    cursor: pointer;
    background: ${theme.palette.primary.dark};
  }
`;
export const SolidLink: React.FC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <StyledBox
        bgcolor={theme.palette.primary.main}
        borderRadius={props.borderRadius}
      >
        <StyledSolidLink>{props.children}</StyledSolidLink>
      </StyledBox>
    </Link>
  );
};
