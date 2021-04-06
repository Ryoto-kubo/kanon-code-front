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
  align-items: center;
  justify-content: space-between;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 100%;
  }
`;
const StyledBoxUserDescription = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
  }
`;
const StyledBoxSwitchMargin = styled(Box)`
  margin-bottom: 3px;
  font-size: 15px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
    margin-right: 8px;
  }
`;
const StyledBoxUserAbout = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
  }
`;
const StyledBoxUserName = styled(Box)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
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
          <StyledBoxSwitchMargin>
            <Link href={`/${props.displayName}`} passHref>
              <a>
                <UserImgIcon picture={props.picture} className={classes.size} />
              </a>
            </Link>
          </StyledBoxSwitchMargin>
          <StyledBoxFlexDirection>
            <StyledBoxUserAbout>
              <StyledBoxSwitchMargin>
                <p>{props.position}</p>
              </StyledBoxSwitchMargin>
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
