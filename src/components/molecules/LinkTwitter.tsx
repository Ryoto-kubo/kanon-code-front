import { IconTwitter } from "@/components/atoms/IconTwitter";
import Link from "@material-ui/core/Link";
import React from "react";
import styled from "styled-components";

type Props = {
  twitterName: string;
};
const StyledLinkTwitter = styled(Link)`
  color: #707070;
  &:hover {
    color: #29a1f2;
  }
`;

export const LinkTwitter: React.FC<Props> = (props) => {
  return (
    <StyledLinkTwitter
      href={`https://twitter.com/${props.twitterName}`}
      target="_blank"
    >
      <IconTwitter fontSize="small" />
    </StyledLinkTwitter>
  );
};
