import { IconGithub } from "@/components/atoms/IconGithub";
import Link from "@material-ui/core/Link";
import React from "react";
import styled from "styled-components";

type Props = {
  githubName: string;
};
const StyledLinkGithub = styled(Link)`
  color: #707070;
  &:hover {
    color: #333333;
  }
`;

export const LinkGithub: React.FC<Props> = (props) => {
  return (
    <StyledLinkGithub
      href={`https://github.com/${props.githubName}`}
      target="_blank"
    >
      <IconGithub fontSize="small" />
    </StyledLinkGithub>
  );
};
