import { TheFooter } from "@/components/common/footer/index";
import { CommonHead } from "@/components/common/head/index";
import { TheStndardHeader } from "@/components/common/header/standard";
import { CognitoUser } from "@aws-amplify/auth";
import { Toolbar } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  title: string;
};
interface UserAttributes {
  sub: string;
  email: string;
  username: string;
}
interface CognitoUserProps extends CognitoUser {
  attributes: UserAttributes;
}

const StyledMain = styled.main`
  // margin-top: 51px;
  background: #ffffff;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [user, setUser] = useState<CognitoUserProps | null>(null);

  useEffect(() => {
    const getCuurentUser = async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        console.log(authenticatedUser, "authenticatedUser");
        console.log("success");
        setUser(authenticatedUser);
      } catch {
        console.log("The user isn't signed in");
      }
    };
    getCuurentUser();
  }, []);

  return (
    <>
      <CommonHead title={title} />
      {user && <span>サインインしています</span>}
      {user === null && <TheStndardHeader />}
      {/* <TheStndardHeader /> */}
      <Toolbar />
      <StyledMain>{children}</StyledMain>
      <TheFooter />
    </>
  );
};

export default Layout;
