import { CustomIconButton } from "@/components/atoms/IconButton";
import { InputBase } from "@material-ui/core/";
import {
  createStyles,
  fade,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
import React from "react";
import styled from "styled-components";

interface Props {
  func: React.MouseEventHandler;
  formFunc: React.FormEventHandler;
}

const StyledForm = styled.form`
  width: 90%;
  margin: 50px auto;
  position: relative;
`;
const StyeldAbsolute = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0px, -50%);
`;

const WithStyledInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    input: {
      fontSize: "16px",
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      borderRadius: "50px",
      padding: "10px 16px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

export const SearchField: React.FC<Props> = (props) => {
  return (
    <StyledForm onSubmit={props.formFunc}>
      <WithStyledInput placeholder="キーワード検索" />
      <StyeldAbsolute>
        <CustomIconButton disableRipple={true} func={props.func}>
          <Search />
        </CustomIconButton>
      </StyeldAbsolute>
    </StyledForm>
  );
};
