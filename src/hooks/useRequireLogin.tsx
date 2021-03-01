import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

interface UserAttributes {
  sub: string;
  email: string;
  username: string;
}
interface CognitoUserProps extends CognitoUser {
  attributes: UserAttributes;
}

export function useRequireLogin(): CognitoUserProps | null {
  const [user, setUser] = useState<CognitoUserProps | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setUser(authenticatedUser);
      } catch {
        console.log("The user isn't signed in");
      }
    })();
  }, []);
  return user;
}
