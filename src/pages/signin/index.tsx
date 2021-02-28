import { SignInContent } from "@/components/organisms/SignInContent";
import { LayoutNoFooter } from "@/layouts/no-footer";
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
  <LayoutNoFooter title="Kanon Code | サインイン">
    {/* <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            required: true,
          },
        ]}
      /> */}
    <StyledContainer>
      <SignInContent onClick={signin} />
    </StyledContainer>
    {/* </AmplifyAuthenticator> */}
  </LayoutNoFooter>
);
export default IndexPage;
