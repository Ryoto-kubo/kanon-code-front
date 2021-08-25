import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { ReactionUsers } from '@/components/molecules/ReactionUsers';
import { ReactionUsersDialog } from '@/components/parts/reactionUsersDialog';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  price: number;
  remainingLength: number;
  reactionUsers: {
    display_name: string;
    icon_src: string;
  }[];
  showToggleDialog: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const StyledBoxShowMessage = styled(Box)`
  text-align: center;
  margin-bottom: 16px;
  &:after {
    border-top: 1px dashed #a8abb1;
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -12px;
    content: '';
  }
`;
const StyledBoxBg = styled(Box)`
  background: #ffffff;
  display: inline-block;
  padding: 0 8px;
  font-size: 16px;
  font-weight: bold;
`;
const StyledBoxReviewInfo = styled(Box)`
  margin: 16px auto;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;
const StyledBoxTitleWrapper = styled(Box)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  display: inline-block;
`;

export const AnnounceOpenReview: React.FC<Props> = ({
  title,
  price,
  remainingLength,
  reactionUsers,
  showToggleDialog,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => {
    setIsOpen(false);
  };
  return (
    <>
      <StyledBoxShowMessage>
        <StyledBoxBg>レビューの続きを見るには</StyledBoxBg>
      </StyledBoxShowMessage>
      <Box textAlign='center' color='#6f7372' mb={3}>
        残り{remainingLength}文字
      </Box>
      <Box textAlign='center'>レビューを購入する</Box>
      <StyledBoxReviewInfo>
        <Box mb={1}>
          <StyledBoxTitleWrapper>{title}</StyledBoxTitleWrapper>
        </Box>
        {reactionUsers.length > 0 && (
          <ReactionUsers reactionUsers={reactionUsers} setIsOpen={setIsOpen} />
        )}
        <CustomSolidButton
          sizing='medium'
          onClick={showToggleDialog}
          color='secondary'
        >
          ¥{price}でレビューを購入する
        </CustomSolidButton>
      </StyledBoxReviewInfo>
      <ReactionUsersDialog
        users={reactionUsers}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </>
  );
};
