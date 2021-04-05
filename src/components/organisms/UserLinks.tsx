import { LinkGithub } from "@/components/molecules/LinkGithub";
import { LinkTwitter } from "@/components/molecules/LinkTwitter";
import { LinkWeb } from "@/components/molecules/LinkWeb";
import { Box } from "@material-ui/core/";
import React from "react";

type Props = {
  githubName: string;
  twitterName: string;
  webSite: string;
};

export const UserLinks: React.FC<Props> = (props) => {
  return (
    <Box display="flex" alignItems="center">
      {props.githubName !== "" && (
        <Box mr={1}>
          <LinkGithub githubName={props.githubName} />
        </Box>
      )}
      {props.twitterName !== "" && (
        <Box mr={1}>
          <LinkTwitter twitterName={props.twitterName} />
        </Box>
      )}
      {props.webSite !== "" && (
        <Box mr={1}>
          <LinkWeb webSite={props.webSite} />
        </Box>
      )}
    </Box>
  );
};
