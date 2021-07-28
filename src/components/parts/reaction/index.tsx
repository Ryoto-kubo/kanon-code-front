import { ReactionUsersDialog } from "@/components/parts/reactionUsersDialog";
import { errorMessages } from "@/consts/error-messages";
import theme from "@/styles/theme";
import { postReaction } from "@/utils/api/post-reaction";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React, { useState } from "react";
import styled from "styled-components";
type Props = {
  sortKey: string;
  postId: string;
  reactionUsers: {
    display_name: string;
    icon_src: string;
  }[];
  displayName: string;
  userIcon: string;
};

const StyledBoxWrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 4px;
    width: 100%;
    content: "";
  }
`;

const StyledBoxTitleWrapper = styled(Box)`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.palette.primary.main};
  position: relative;
  background: #ffffff;
  padding: 0 8px;
  margin-top: -33px;
  margin-bottom: 16px;
  z-index: 3;
}
`;

const StyledButton = styled(Button)`
  padding-left: 40px;
  padding-right: 40px;
}
`;

const StyledButtonAvatarWrapper = styled(Button)`
background-color: #ffffff;
  &:hover {
    background-color: #ffffff;
  }
}
`;

export const Reaction: React.FC<Props> = ({
  sortKey,
  postId,
  reactionUsers,
  displayName,
  userIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<
    { display_name: string; icon_src: string }[]
  >(reactionUsers);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const post = async () => {
    try {
      const result = await postReaction({ sortKey, postId });
      const action = result.data.resultAction;
      if (action === "put") {
        setUsers([
          ...users,
          {
            display_name: displayName,
            icon_src: userIcon,
          },
        ]);
      } else {
        const slicedUsers = users.slice();
        const newUsers = slicedUsers.filter((el) => el.icon_src !== userIcon);
        setUsers(newUsers);
      }
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };
  return (
    <StyledBoxWrapper>
      <StyledBoxTitleWrapper component="span">
        このレビューをみんなにもオススメしますか？
      </StyledBoxTitleWrapper>
      <Box mb={2}>
        <StyledButton
          variant="outlined"
          color="primary"
          startIcon={<SentimentSatisfiedOutlinedIcon />}
          onClick={() => post()}
        >
          オススメする
        </StyledButton>
      </Box>
      {users.length > 0 && (
        <StyledButtonAvatarWrapper
          onClick={() => setIsOpen(true)}
          disableRipple
        >
          <AvatarGroup max={8}>
            {users.map((user, index) => (
              <Avatar key={index} src={user.icon_src} />
            ))}
          </AvatarGroup>
        </StyledButtonAvatarWrapper>
      )}
      <ReactionUsersDialog
        users={users}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </StyledBoxWrapper>
  );
};
