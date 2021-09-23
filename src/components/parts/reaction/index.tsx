import { ReactionUsers } from '@/components/molecules/ReactionUsers';
import { ReactionUsersDialog } from '@/components/parts/reactionUsersDialog';
import { errorMessages } from '@/consts/error-messages';
import theme from '@/styles/theme';
import { postReaction } from '@/utils/api/post-reaction';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import React, { useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';

type Props = {
  authUserName: string;
  sortKey: string;
  postId: string;
  isReaction: boolean;
  reactionUsers: {
    display_name: string;
    icon_src: string;
  }[];
  displayName: string;
  userIcon: string;
  setIsOpenSignin: SetterOrUpdater<boolean>;
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
    content: '';
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
  font-weight: bold;
}
`;
const StyledBoxButtonWrapper = styled(Box)`
  margin-bottom: 16px;
  min-height: 36px;
`;

export const Reaction: React.FC<Props> = ({
  authUserName,
  sortKey,
  postId,
  isReaction,
  reactionUsers,
  displayName,
  userIcon,
  setIsOpenSignin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMyReaction, setIsMyReaction] = useState(isReaction);
  const [users, setUsers] = useState<
    { display_name: string; icon_src: string }[]
  >(reactionUsers || []);

  const post = async () => {
    if (authUserName === '') {
      setIsOpenSignin(true);
      return;
    }
    try {
      const result = await postReaction({ sortKey, postId });
      const action = result.data.resultAction;
      if (action === 'put') {
        setUsers([
          {
            display_name: displayName,
            icon_src: userIcon,
          },
          ...users,
        ]);
        setIsMyReaction(true);
      } else {
        const slicedUsers = users.slice();
        const newUsers = slicedUsers.filter(el => el.icon_src !== userIcon);
        setUsers(newUsers);
        setIsMyReaction(false);
      }
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };
  return (
    <StyledBoxWrapper>
      <StyledBoxTitleWrapper component='span'>
        {!authUserName
          ? 'サインイン後にオススメできます'
          : 'このレビューをみんなにもオススメしますか？'}
      </StyledBoxTitleWrapper>
      <StyledBoxButtonWrapper>
        <StyledButton
          disableElevation={isMyReaction}
          variant={isMyReaction ? 'contained' : 'outlined'}
          color='primary'
          startIcon={<SentimentSatisfiedOutlinedIcon />}
          onClick={() => post()}
        >
          {isMyReaction ? 'このレビューをオススメ中' : 'オススメする'}
        </StyledButton>
      </StyledBoxButtonWrapper>
      {users.length > 0 && (
        <ReactionUsers reactionUsers={users} setIsOpen={setIsOpen} />
      )}
      <ReactionUsersDialog
        users={users}
        isOpen={isOpen}
        closeDialog={() => setIsOpen(false)}
      />
    </StyledBoxWrapper>
  );
};
