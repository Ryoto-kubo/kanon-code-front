import theme from "@/styles/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  href: string;
  color?: string;
}

const StyledSolidLink = styled.a`
  display: inherit;
  // color: ${theme.palette.text.primary};
`;

export const LinkWrapper: React.FC<Props> = (props) => {
  return (
    <Link href={props.href} passHref>
      <StyledSolidLink>{props.children}</StyledSolidLink>
    </Link>
  );
};
