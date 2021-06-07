import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheLoggedHeader } from "@/components/common/header/logged";
import { TheStndardHeader } from "@/components/common/header/standard";
import { UserTypes } from "@/types/global";
import { Toolbar } from "@material-ui/core";
import { Container } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
  currentUser: null | UserTypes;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;
const StyledContainer = styled(Container)`
  width: 100%;
  margin-top: 70px;
  max-width: 1000px;
`;
export const SettingLayout = ({ children, title, currentUser }: Props) => {
  const router = useRouter();
  if (currentUser === null) {
    router.push("/");
    return null;
  }
  return (
    <>
      <CommonHead title={title} />
      {currentUser && <TheLoggedHeader currentUser={currentUser} />}
      {currentUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledContainer>
        <StyleBoxMain mt={4} component="main">
          {children}
        </StyleBoxMain>
      </StyledContainer>
      <TheFooter />
    </>
  );
};
