import { SearchField } from "@/components/molecules/SearchField";
import { CircleGrids } from "@/components/organisms/CircleGrids";
import Layout from "@/layouts/standard";
import { CognitoUser } from "@aws-amplify/auth";
import { Container, Grow } from "@material-ui/core/";
import React from "react";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const formFunc = (e: React.FormEvent) => {
  console.log("enterを押した検索");
  e.preventDefault();
};
const func = () => {
  console.log("iconを押した検索");
};

const IndexPage: React.FC<Props> = (props) => (
  <Layout title="Kanon Code | 検索" authUser={props.authUser}>
    <Container maxWidth="md">
      <SearchField formFunc={formFunc} func={func} />
      <Grow in={true}>
        <CircleGrids func={func} />
      </Grow>
    </Container>
  </Layout>
);
export default IndexPage;
