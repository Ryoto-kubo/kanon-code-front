import { RequestItemHeader } from "@/components/molecules/RequestItemHeader";
import { ContentTypes, UserProfileTypes } from "@/types/global/";
import React from "react";
// import styled from "styled-components";

type Props = {
  contents: ContentTypes;
  profile: UserProfileTypes;
  createDate: string;
};

export const ReviewRequestItemHeader: React.FC<Props> = (props) => {
  return (
    <RequestItemHeader
      contents={props.contents}
      profile={props.profile}
      createDate={props.createDate}
    />
  );
};
