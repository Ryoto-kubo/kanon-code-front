import { CustomIconButton } from "@/components/atoms/IconButton";
import theme from "@/styles/theme";
import { InputBase } from "@material-ui/core/";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

interface Props {
  func: React.MouseEventHandler;
  formFunc: React.FormEventHandler;
}

const StyledForm = styled.form`
  width: 70%;
  margin: 50px auto;
`;
const StyledInput = styled(InputBase)`
  width: 100%;
  font-size: 14px;
  background: ${fade(theme.palette.primary.main, 0.1)};
  padding: 5px 16px;
  border-radius: 50px;
`;

export const SearchInHeader: React.FC<Props> = (props) => {
  return (
    <StyledForm onSubmit={props.formFunc}>
      <StyledInput
        placeholder="キーワード検索"
        inputProps={{ "aria-label": "naked" }}
        endAdornment={
          <CustomIconButton disableRipple={true} func={props.func}>
            <Search />
          </CustomIconButton>
        }
      />
    </StyledForm>
  );
};
