import Layout from "@/layouts/standard";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import React from "react";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const signOutHandler = async () => {
  try {
    const result = await Auth.signOut();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const IndexPage: React.FC<Props> = (props) => {
  return (
    <Layout title="Kanon Code | サインイン" authUser={props.authUser}>
      <h1>Welcome</h1>
      <button onClick={() => signOutHandler()}>signout</button>
    </Layout>
  );
};

export default IndexPage;
