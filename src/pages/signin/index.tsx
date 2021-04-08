import { SignInContent } from "@/components/organisms/SignInContent";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Container } from "@material-ui/core/";
import { Auth } from "aws-amplify";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  margin-top: 70px;
`;

const signin = () => {
  Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  });
};

export const getServerSideProps = async () => ({
  props: {
    layout: "LayoutNoFooter",
    title: "サインイン",
  },
});

const IndexPage: React.FC = () => (
  <StyledContainer>
    <SignInContent onClick={signin} />
  </StyledContainer>
);
export default IndexPage;
