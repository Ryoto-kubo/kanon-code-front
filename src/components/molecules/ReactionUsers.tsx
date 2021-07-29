import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React from "react";
import styled from "styled-components";

type Props = {
  reactionUsers: {
    display_name: string;
    icon_src: string;
  }[];
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
};

const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
  }
`;
const StyledButtonAvatarWrapper = styled(Button)`
  background-color: #ffffff;
  &:hover {
    background-color: #ffffff;
  }
}
`;
const StyledBoxUserLength = styled(Box)`
  font-size: 12px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 16px;
    font-size: 14px;
  }
`;

export const ReactionUsers: React.FC<Props> = ({
  reactionUsers,
  setIsOpen,
}) => {
  return (
    <Box mb={1}>
      <StyledButtonAvatarWrapper onClick={() => setIsOpen(true)} disableRipple>
        <StyledBoxFlex>
          <AvatarGroup max={8}>
            {reactionUsers.map((user, index) => (
              <Avatar key={index} src={user.icon_src} />
            ))}
          </AvatarGroup>
          <StyledBoxUserLength>
            {reactionUsers.length}人がオススメしています
          </StyledBoxUserLength>
        </StyledBoxFlex>
      </StyledButtonAvatarWrapper>
    </Box>
  );
};
