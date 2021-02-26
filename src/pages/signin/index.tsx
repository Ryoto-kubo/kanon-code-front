// import awsConfiguration from "@/aws/cognito/config";
import { SignInContent } from "@/components/organisms/SignInContent";
import { LayoutNoFooter } from "@/layouts/no-footer";
import { Container } from "@material-ui/core/";
// import {
// CognitoUserAttribute,
// CognitoUserPool,
//   CognitoIdentityCredentials
// } from "amazon-cognito-identity-js";
import React from "react";
import styled from "styled-components";

// console.log(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID);
// location.href = `https://kanon-code.auth.ap-northeast-1.amazoncognito.com/oauth2/authEorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&identity_provider=Google`;

// AWS.config.credentials = new CognitoIdentityCredentials({
//   IdentityPoolId: 'IDENTITY_POOL_ID',
//   Logins: {
//      'accounts.google.com': authResult['id_token']
//   }
// });

// Obtain AWS credentials
// AWS.config.credentials.get(function(){
// Access AWS resources here.
// });

// const userPool = new CognitoUserPool({
//   UserPoolId: awsConfiguration.UserPoolId,
//   ClientId: awsConfiguration.ClientId,
// });
// const attributeList = [
//   new CognitoUserAttribute({
//     Name: "email",
//     Value: "sax.guiter@icloud.com",
//   }),
// ];
// userPool.signUp(
//   "sax.guiter@icloud.com",
//   "sr400@HDS",
//   attributeList,
//   [],
//   (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(result);
//   }
// );

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  margin-top: 70px;
`;
const signin = () => {
  location.href = `https://kanon-code${process.env.NEXT_PUBLIC_SUFFIX}.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&identity_provider=Google`;
};
const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    <StyledContainer>
      <SignInContent onClick={signin} />
    </StyledContainer>
  </LayoutNoFooter>
);
export default IndexPage;
