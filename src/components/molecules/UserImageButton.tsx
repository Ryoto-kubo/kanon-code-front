import { CustomIconButton } from "@/components/atoms/IconButton";
import { UserImgIcon } from "@/components/atoms/UserImgIcon";
import React from "react";

interface Props {
  picture: string;
  disableRipple: boolean;
  func: React.MouseEventHandler;
}

export const UserImageButton: React.FC<Props> = (props) => {
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <UserImgIcon picture={props.picture} />
    </CustomIconButton>
  );
};
