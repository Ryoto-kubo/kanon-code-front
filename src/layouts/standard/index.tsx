import { TheFooter } from '@/components/common/footer/index';
// import { CommonHead } from '@/components/common/head/index';
import { TheLoggedHeader } from '@/components/common/header/logged';
import { TheRegisterHeader } from '@/components/common/header/register';
import { TheStndardHeader } from '@/components/common/header/standard';
import { SigninDialog } from '@/components/parts/signinDialog';
import { useIsOpenSignin } from '@/recoil/hooks/openSignin';
import { UserTypes } from '@/types/global';
import Box from '@material-ui/core/Box';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  title: string;
  currentUser: null | UserTypes;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;

const Layout: React.FC<Props> = ({ children, currentUser }) => {
  const displayName = currentUser?.user_profile.display_name;
  const { isOpenSignin, setIsOpenSignin } = useIsOpenSignin();
  return (
    <>
      {/* <CommonHead title={title} /> */}
      {displayName === '' ? (
        <TheRegisterHeader />
      ) : currentUser ? (
        <TheLoggedHeader currentUser={currentUser} />
      ) : (
        <TheStndardHeader />
      )}
      <StyleBoxMain mt={4} component='main'>
        {children}
      </StyleBoxMain>
      <SigninDialog
        isOpenDialog={isOpenSignin}
        closeDialog={() => setIsOpenSignin(false)}
      />
      <TheFooter />
    </>
  );
};

export default Layout;
