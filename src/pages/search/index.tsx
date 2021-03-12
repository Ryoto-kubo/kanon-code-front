import { SearchInHeader } from "@/components/molecules/SearchInHeader";
import Layout from "@/layouts/standard";
import { CognitoUser } from "@aws-amplify/auth";
import React from "react";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const IndexPage: React.FC<Props> = (props) => (
  <Layout title="Kanon Code | 検索" authUser={props.authUser}>
    <SearchInHeader />
  </Layout>
);
export default IndexPage;
