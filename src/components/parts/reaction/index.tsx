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
  reactionUserIcons: string[];
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

export const Reaction: React.FC<Props> = ({
  sortKey,
  postId,
  reactionUserIcons,
  userIcon,
}) => {
  const [userIcons, setUserIcons] = useState<string[]>(reactionUserIcons);
  const post = async () => {
    try {
      const result = await postReaction({ sortKey, postId });
      const action = result.data.resultAction;
      if (action === "put") {
        setUserIcons([...userIcons, userIcon]);
      } else {
        const slicedUserIcons = userIcons.slice();
        const newUserIcons = slicedUserIcons.filter((el) => el !== userIcon);
        setUserIcons(newUserIcons);
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
      {userIcons.length > 0 && (
        <AvatarGroup max={8}>
          {userIcons.map((userIcon, index) => (
            <Avatar key={index} src={userIcon} />
          ))}
        </AvatarGroup>
      )}
    </StyledBoxWrapper>
  );
};
