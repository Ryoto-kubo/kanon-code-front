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
const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    <StyledContainer>
      <SignInContent />
    </StyledContainer>
  </LayoutNoFooter>
);
export default IndexPage;
