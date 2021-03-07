import { CustomIconButton } from "@/components/atoms/IconButton";
import { Input } from "@material-ui/core/";
import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

interface Props {
  func: React.MouseEventHandler;
  formFunc: React.FormEventHandler;
}

const StyledInput = styled(Input)`
  font-size: 14px;
`;

export const SearchInHeader: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.formFunc}>
      <StyledInput
        placeholder="キーワード検索"
        inputProps={{ "aria-label": "description" }}
        endAdornment={
          <CustomIconButton disableRipple={true} func={props.func}>
            <Search />
          </CustomIconButton>
        }
      />
    </form>
  );
};
