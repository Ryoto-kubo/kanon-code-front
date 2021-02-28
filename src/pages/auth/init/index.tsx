import Layout from "@/layouts/standard";
// import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import React from "react";

// interface UserAttributes {
//   sub: string;
//   email: string;
//   username: string;
// }
// interface CognitoUserProps extends CognitoUser {
//   attributes: UserAttributes;
// }

// const getUrlQueries = (queryKey: string) => {
//   interface StringKeyObject {
//     [key: string]: any;
//   }
//   const queryStr = window.location.search.slice(1); // 文頭?を除外
//   let queries: StringKeyObject = {};

//   // クエリがない場合は空のオブジェクトを返す
//   if (!queryStr) {
//     return queries;
//   }

//   // クエリ文字列を & で分割して処理
//   queryStr.split("&").forEach((queryStr) => {
//     // = で分割してkey,valueをオブジェクトに格納
//     const queryArr: string[] = queryStr.split("=");
//     queries[queryArr[0]] = queryArr[1];
//   });

//   return queries[queryKey];
// };

const signOutHandler = async () => {
  try {
    const result = await Auth.signOut();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
const IndexPage: React.FC = () => {
  return (
    <Layout title="Kanon Code | サインイン">
      <h1>Welcome</h1>
      <button onClick={() => signOutHandler()}>signout</button>
    </Layout>
  );
};

export default IndexPage;
