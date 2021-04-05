import Avatar from "@material-ui/core/Avatar";
import React from "react";

interface Props {
  picture: string;
  className?: string;
  // ref: React.Ref<HTMLDivElement>;
}

export const UserImgIcon: React.FC<Props> = (props) => {
  return (
    <Avatar
      src={props.picture}
      className={props.className}
      alt="ユーザーアイコン"
      // ref={props.ref}
    />
  );
};
