import Menu from "@material-ui/core/Menu";
import React from "react";
import styled from "styled-components";

type Props = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const StyledMenu = styled(Menu)`
  width: 320px;
`;

export const DropMenu: React.FC<Props> = (props) => {
  return (
    <StyledMenu
      anchorEl={props.anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={props.isOpen}
      onClose={props.onClose}
    >
      {props.children}
    </StyledMenu>
  );
};
