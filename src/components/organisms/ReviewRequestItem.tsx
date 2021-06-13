import { BookmarkButton } from "@/components/molecules/BookmarkButton";
import { RequestItemHeader } from "@/components/molecules/RequestItemHeader";
import { ContentTypes, UserProfileTypes } from "@/types/global/";
import Box from "@material-ui/core/Box";
import React from "react";
// import styled from "styled-components";

type Props = {
  contents: ContentTypes;
  profile: UserProfileTypes;
  createDate: string;
};

export const ReviewRequestItem: React.FC<Props> = (props) => {
  const onClick = () => {
    console.log("hoge");
  };
  return (
    <>
      <Box mb={3}>
        <BookmarkButton
          sizing="medium"
          variant="outlined"
          color="primary"
          onClick={onClick}
        />
      </Box>
      <Box mb={2}>
        <RequestItemHeader
          contents={props.contents}
          profile={props.profile}
          createDate={props.createDate}
        />
      </Box>
    </>
  );
};
