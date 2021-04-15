import { CustomIconButton } from "@/components/atoms/IconButton";
import { UserImgIcon } from "@/components/atoms/UserImgIcon";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

interface Props {
  picture: string;
  disableRipple: boolean;
  func: React.MouseEventHandler;
}

const useStyles = makeStyles(() => ({
  size: {
    width: "40px",
    height: "40px",
  },
}));

export const UserImageButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <CustomIconButton disableRipple={true} func={props.func}>
      <UserImgIcon picture={props.picture} className={classes.size} />
    </CustomIconButton>
  );
};
