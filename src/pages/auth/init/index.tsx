import { CognitoUser } from "@aws-amplify/auth";
import React from "react";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const IndexPage: React.FC<Props> = () => {
  return (
    <></>
    // <Layout title="Kanon Code | サインイン" authUser={props.authUser}>
    //   <h1>Welcome</h1>
    // </Layout>
  );
};

export default IndexPage;
