import { LinkGithub } from "@/components/molecules/LinkGithub";
import { LinkTwitter } from "@/components/molecules/LinkTwitter";
import { LinkWeb } from "@/components/molecules/LinkWeb";
import { Box } from "@material-ui/core/";
import React from "react";

type Props = {
  githubName: string;
  twitterName: string;
  webSite: string;
  fontSize: "small" | "inherit" | "default" | "large" | undefined;
};

export const UserLinks: React.FC<Props> = (props) => {
  return (
    <Box display="flex" alignItems="center">
      {props.githubName !== "" && (
        <Box mr={1} width={20} height={20}>
          <LinkGithub githubName={props.githubName} fontSize={props.fontSize} />
        </Box>
      )}
      {props.twitterName !== "" && (
        <Box mr={1} width={20} height={20}>
          <LinkTwitter
            twitterName={props.twitterName}
            fontSize={props.fontSize}
          />
        </Box>
      )}
      {props.webSite !== "" && (
        <Box mr={1} width={20} height={20}>
          <LinkWeb webSite={props.webSite} fontSize={props.fontSize} />
        </Box>
      )}
    </Box>
  );
};
