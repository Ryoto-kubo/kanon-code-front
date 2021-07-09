import { CustomLoader } from "@/components/common/loader";
import { errorMessages } from "@/consts/error-messages";
import { getUser } from "@/utils/api/get-user";
import { postRegist } from '@/utils/api/post-register';
import { Auth } from 'aws-amplify';
import { useRouter } from "next/router";
import { setCookie } from 'nookies';
import React, { useEffect } from "react";
type Props = {
  title: string;
  // authUser: any;
};

// const registUser = async (payload: any) => {
//   return await axios.post(apis.REGISTER, payload);
// };
const IndexPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const moveToRegister = () => {
    router.push("/register");
  };
  const moveToTop = () => {
    router.push("/");
  };
  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        console.log('auth');

        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const jwtToken = authenticatedUser.signInUserSession.idToken.jwtToken
        setCookie(null, "idToken", jwtToken)
        const response = await getUser();
        console.log(response, 'response');

        if (response.status !== 200) throw err;
        const item = response.data.Item;
        console.log(item, 'item');

        if (item === undefined) {
          // ユーザー未登録
          const response = await postRegist();
          if (response.status !== 200) throw err;
          moveToRegister();
        } else {
          // ユーザーとして登録済み
          if (item.user_profile.display_name === "") {
            moveToRegister();
          } else {
            moveToTop();
          }
        }
      } catch (error) {
        console.log(error.response);

        console.log(error);
        alert(errorMessages.SYSTEM_ERROR);
        moveToTop();
      }
    })();
  }, []);

  return (
    <>
      <CustomLoader />
    </>
  );
};

export default IndexPage;
