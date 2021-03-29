import { Box, Button } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled(Button)`
  max-height: 36px;
`;
const StyledBox = styled(Box)`
  margin-right: 16px;
  display: flex;
`;
const StyledSpan = styled.span`
  font-weight: bold;
`;
export const SocialSignInButton: React.FC<Props> = (props) => {
  return (
    <StyledButton variant="outlined" onClick={props.onClick}>
      <StyledBox>{props.children}</StyledBox>
      <StyledSpan>{props.text}</StyledSpan>
    </StyledButton>
  );
};
