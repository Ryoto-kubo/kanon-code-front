import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { Router } from "next/router";
import { useEffect, useState } from "react";

interface UserAttributes {
  sub: string;
  email: string;
  username: string;
}
interface CognitoUserProps extends CognitoUser {
  attributes: UserAttributes;
}

export function useRequireLogin(router: Router): CognitoUserProps | null {
  const [user, setUser] = useState<CognitoUserProps | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setUser(authenticatedUser);
        if (router.pathname === "/auth/init") {
          location.href = "/";
        }
      } catch {
        if (router.pathname === "/" || router.pathname === "/signin") return;
        location.href = "/";
        console.log("The user isn't signed in");
      }
    })();
  }, [router.pathname]);

  return user;
}
