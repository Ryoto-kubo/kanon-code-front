import IconButton from "@material-ui/core/IconButton";
import React from "react";
import styled from "styled-components";

interface Props {
  disableRipple: boolean;
  func: Function;
}
const StyledIconButton = styled(IconButton)`
  padding: 0;
  &:hover {
    background: none;
  }
`;

export const CustomIconButton: React.FC<Props> = (props) => {
  return (
    <StyledIconButton
      disableRipple={props.disableRipple}
      onClick={() => props.func()}
    >
      {props.children}
    </StyledIconButton>
  );
};
