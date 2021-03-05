import { SolidLink } from "@/components/atoms/SolidLink";
import { NotificationsButton } from "@/components/molecules/NotificationsButton";
import { SearchInHeader } from "@/components/molecules/SearchInHeader";
import { UserImageButton } from "@/components/molecules/UserImageButton";
import React from "react";
import styled from "styled-components";

interface Props {
  picture: string;
  func: Function;
  formFunc: React.FormEventHandler;
}

const StyledUseMr = styled.span`
  &:not(:last-child) {
    margin-right: 24px;
  }
`;

export const LoggedHeaderParts: React.FC<Props> = (props) => {
  return (
    <>
      <StyledUseMr>
        <SearchInHeader formFunc={props.formFunc} func={props.func} />
      </StyledUseMr>
      <StyledUseMr>
        <NotificationsButton disableRipple={true} func={props.func} />
      </StyledUseMr>
      <StyledUseMr>
        <SolidLink href="/posts/new">レビューを依頼する</SolidLink>
      </StyledUseMr>
      <StyledUseMr>
        <UserImageButton
          picture={props.picture}
          disableRipple={true}
          func={props.func}
        />
      </StyledUseMr>
    </>
  );
};
