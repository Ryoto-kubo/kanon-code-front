import { TheFooter } from '@/components/common/footer/index';
import { CommonHead } from '@/components/common/head/index';
import { ThePostEditHeader } from '@/components/common/header/postEdit';
import { UserTypes } from '@/types/global';
// import { Toolbar } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonText = Readonly<'編集設定' | '保存中...' | '保存済み ✔︎'>;

type Props = {
  children: ReactNode;
  title: string;
  currentUser: null | UserTypes;
  prepareValidRegister: () => void;
  previousPage: () => void;
  updateButtonText: (value: ButtonText) => void;
  buttonText: ButtonText;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;

const LayoutPostEdit = ({
  children,
  title,
  currentUser,
  prepareValidRegister,
  previousPage,
  updateButtonText,
  buttonText,
}: Props) => {
  const router = useRouter();
  if (currentUser === null) {
    router.push('/');
    return null;
  }

  return (
    <>
      <CommonHead title={title} />
      <ThePostEditHeader
        prepareValidRegister={prepareValidRegister}
        previousPage={previousPage}
        updateButtonText={updateButtonText}
        buttonText={buttonText}
      />
      <StyleBoxMain mt={4} component='main'>
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  );
};
export default LayoutPostEdit;
