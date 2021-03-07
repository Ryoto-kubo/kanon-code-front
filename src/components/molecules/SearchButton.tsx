import { CustomIconButton } from "@/components/atoms/IconButton";
import { Search } from "@material-ui/icons";
import React from "react";

interface Props {
  disableRipple: boolean;
  func: React.MouseEventHandler;
}

export const SearchButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <Search />
    </CustomIconButton>
  );
};
