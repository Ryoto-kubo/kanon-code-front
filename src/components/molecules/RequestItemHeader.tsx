// import { SolidLinkSecondary } from "@/components/atoms/SolidLinkSecondary";
import { RequestItemTitle } from "@/components/molecules/RequestItemTitle";
import { RequestItemUser } from "@/components/molecules/RequestItemUser";
import { ContentTypes, UserProfileTypes } from "@/types/global/";
import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";

type Props = {
  contents: ContentTypes;
  profile: UserProfileTypes;
  createDate: string;
};

const StyledBoxTitle = styled(Box)`
  margin-bottom: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
  }
`;
const StyledBoxImgWrapper = styled(Box)`
  margin-right: 0px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-right: 16px;
  }
`;
const StyledBoxUserWrapper = styled(Box)`
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
  }
`;
const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 0px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;

export const RequestItemHeader: React.FC<Props> = (props) => {
  const iconSrc = props.contents.target_icon.icon_path;
  const title = props.contents.title;
  const tagArray = props.contents.tag_list;
  const name = props.profile.display_name;
  const userIcon = props.profile.icon_src;

  return (
    <>
      <StyledBoxTitleWrapper>
        <Box>
          <StyledBoxTitle>
            <StyledBoxImgWrapper>
              <img
                width={"70px"}
                height={"70px"}
                src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${iconSrc}`}
              />
            </StyledBoxImgWrapper>
            <Box>
              <RequestItemTitle title={title} tagArray={tagArray} />
            </Box>
          </StyledBoxTitle>
          <StyledBoxUserWrapper>
            <RequestItemUser
              name={name}
              date={props.createDate}
              userIcon={userIcon}
              width={"32px"}
              height={"32px"}
            />
          </StyledBoxUserWrapper>
        </Box>
        {/* <Box>
          <SolidLinkSecondary href="#" borderRadius={4}>
            レビューする
          </SolidLinkSecondary>
        </Box> */}
      </StyledBoxTitleWrapper>
    </>
  );
};
