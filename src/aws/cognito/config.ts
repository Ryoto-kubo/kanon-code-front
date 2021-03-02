import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REJION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    IdentityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    oauth: {
      domain: `kanon-code${process.env.NEXT_PUBLIC_SUFFIX}.auth.${process.env.NEXT_PUBLIC_COGNITO_REJION}.amazoncognito.com`,
      scope: ["openid", "email", "profile"],
      redirectSignIn: "http://localhost:3000/auth/init",
      redirectSignOut: "http://localhost:3000/signout",
      responseType: "code",
    },
  },
});
