import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REJION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    IdentityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    oauth: {
      domain: `kanon-code${process.env.NEXT_PUBLIC_SUFFIX}.auth.${process.env.NEXT_PUBLIC_COGNITO_REJION}.amazoncognito.com`,
      scope: ['openid', 'email', 'profile'],
      redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
      redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT,
      responseType: 'code',
    },
  },
});
