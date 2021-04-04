import { IconWeb } from "@/components/atoms/IconWeb";
import theme from "@/styles/theme";
import Link from "@material-ui/core/Link";
import React from "react";
import styled from "styled-components";

type Props = {
  webSite: string;
};
const StyledLinkWeb = styled(Link)`
  color: #707070;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;

export const LinkWeb: React.FC<Props> = (props) => {
  return (
    <StyledLinkWeb href={props.webSite} target="_blank">
      <IconWeb fontSize="small" />
    </StyledLinkWeb>
  );
};