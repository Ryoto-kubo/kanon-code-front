import { CustomLoader } from "@/components/common/loader";
import { apis } from "@/consts/api/";
import { errorMessages } from "@/consts/error-messages";
import { getUser } from "@/utils/api/get-user";
import { axios } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  title: string;
  authUser: any;
};

const registUser = async (payload: any) => {
  return await axios.post(apis.REGISTER, payload);
};
const IndexPage: React.FC<Props> = (props) => {
  console.log(props, 'props auth start');
  // if (!props.authUser) return <></>;
  const router = useRouter();
  const moveToRegister = () => {
    router.push("/register");
  };
  const moveToTop = () => {
    router.push("/");
  };
  useEffect(() => {
    const err = new Error();
    const payload = props.authUser?.signInUserSession.idToken.payload;
    console.log(payload, "payload");

    console.log('auth effect');

    (async () => {
      try {
        const response = await getUser();
        console.log(response, 'response');

        if (response.status !== 200) throw err;
        const item = response.data.Item;
        if (item === undefined) {
          // ユーザー未登録
          const response = await registUser(payload);
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
        console.log(error.response, 'auth');

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
