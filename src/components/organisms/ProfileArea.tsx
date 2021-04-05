import { SolidLink } from "@/components/atoms/SolidLink";
import { UserImgIcon } from "@/components/atoms/UserImgIcon";
import { UserLinks } from "@/components/organisms/UserLinks";
import { Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  picture: string;
  position: string;
  githubName: string;
  twitterName: string;
  webSite: string;
  displayName: string;
};

const useStyles = makeStyles(() => ({
  size: {
    width: "60px",
    height: "60px",
  },
}));

const StyledBoxProfileArea = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
  }
`;
const StyledBoxUserProfile = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    width: 100%;
    align-items: center;
  }
`;
const StyledBoxUserDescription = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
  }
`;
const StyledBoxUserAbout = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
  }
`;
const StyledBoxUserName = styled(Box)`
  font-size: 18px;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 20px;
  }
`;
const StyledBoxFlexDirection = styled(Box)`
  flex-direction: column-reverse;
  display: flex;
  ${(props) => props.theme.breakpoints.up("sm")} {
    flex-direction: unset;
    display: block;
  }
`;

export const ProfileArea: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <StyledBoxProfileArea component="section">
      <StyledBoxUserProfile>
        <StyledBoxUserDescription>
          <Box mr={1}>
            <Link href={`/${props.displayName}`} passHref>
              <a>
                <UserImgIcon picture={props.picture} className={classes.size} />
              </a>
            </Link>
          </Box>
          <StyledBoxFlexDirection>
            <StyledBoxUserAbout>
              <Box mr={1}>
                <span>{props.position}</span>
              </Box>
              <UserLinks
                githubName={props.githubName}
                twitterName={props.twitterName}
                webSite={props.webSite}
              />
            </StyledBoxUserAbout>
            <StyledBoxUserName>{props.displayName}</StyledBoxUserName>
          </StyledBoxFlexDirection>
        </StyledBoxUserDescription>
        <SolidLink href="/settings/profile" borderRadius={50}>
          プロフィールを編集
        </SolidLink>
      </StyledBoxUserProfile>
    </StyledBoxProfileArea>
  );
};
