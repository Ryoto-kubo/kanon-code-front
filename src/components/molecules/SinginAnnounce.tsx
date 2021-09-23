import { Box } from '@material-ui/core';
import React from 'react';
import { CustomSolidButton } from '../atoms/SolidButton';

type Props = {
  text: string;
  setIsOpenSignin: (value: React.SetStateAction<boolean>) => void;
};

export const SigninAnnounce: React.FC<Props> = props => {
  const { text, setIsOpenSignin } = props;
  return (
    <Box textAlign='center'>
      <Box mb={1}>{text}</Box>
      <CustomSolidButton
        sizing='small'
        onClick={() => setIsOpenSignin(true)}
        color='primary'
      >
        サインイン
      </CustomSolidButton>
    </Box>
  );
};
