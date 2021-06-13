import BookmarkIcon from "@material-ui/icons/Bookmark";
import React from "react";

type Props = {
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
  color:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
};

export const IconBookmark: React.FC<Props> = (props) => {
  return <BookmarkIcon fontSize={props.fontSize} color={props.color} />;
};
