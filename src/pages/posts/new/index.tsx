import { SignInContent } from "@/components/organisms/SignInContent";
import LayoutPosts from "@/layouts/posts";
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

const IndexPage: React.FC = () => (
  <LayoutPosts title="Kanon Code | レビュー依頼">
    <StyledContainer>
      <SignInContent onClick={signin} />
    </StyledContainer>
  </LayoutPosts>
);
export default IndexPage;
