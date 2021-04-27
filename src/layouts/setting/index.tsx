import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheLoggedHeader } from "@/components/common/header/logged";
import { TheStndardHeader } from "@/components/common/header/standard";
import { TabsHeader } from "@/components/organisms/TabsHeader";
import { settingTabs } from "@/consts/setting-tabs";
import { Toolbar } from "@material-ui/core";
import { Container } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
  authUser: any;
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;
const StyledContainer = styled(Container)`
  width: 100%;
  margin-top: 70px;
  max-width: 1000px;
`;
export const SettingLayout = ({ children, title, authUser }: Props) => {
  const router = useRouter();
  if (authUser === null) {
    router.push("/");
    return null;
  }
  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    event.preventDefault();
    router.push(newValue);
  };

  return (
    <>
      <CommonHead title={title} />
      {authUser && <TheLoggedHeader authUser={authUser} />}
      {authUser === null && <TheStndardHeader />}
      <Toolbar />
      <StyledContainer>
        <StyleBoxMain mt={4} component="main">
          <CustomHeading2 fontSize={24} marginBottom={1}>
            設定
          </CustomHeading2>
          <Box mb={3}>
            <TabsHeader
              value={router.pathname}
              onChange={changeTab}
              tabLists={settingTabs}
            />
          </Box>
          {children}
        </StyleBoxMain>
      </StyledContainer>
      <TheFooter />
    </>
  );
};
