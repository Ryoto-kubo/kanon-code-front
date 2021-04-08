import { icons } from "@/components/atoms/Icons";
import { CircleGrid } from "@/components/molecules/CircleGrid";
import { SearchField } from "@/components/molecules/SearchField";
import { CircleGrids } from "@/components/organisms/CircleGrids";
import Layout from "@/layouts/standard";
import { CognitoUser } from "@aws-amplify/auth";
import { Container } from "@material-ui/core/";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const formFunc = (e: React.FormEvent) => {
  console.log("enterを押した検索");
  e.preventDefault();
};

export const getServerSideProps = async () => ({
  props: {
    layout: "Layout",
    title: "検索",
  },
});

const IndexPage: React.FC<Props> = (props) => {
  const router = useRouter();

  const initIconComponents = () => {
    const results = [];
    for (const [index, item] of icons.entries()) {
      results.push(
        <CircleGrid key={index} text={item.text} onClick={iconClick}>
          {item.dom}
        </CircleGrid>
      );
    }
    return results;
  };

  const filterdIcons = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // To identify the dots
    const searchStr =
      e.target.value.toLowerCase() === "."
        ? "\\."
        : e.target.value.toLowerCase();
    const updateList = initIconComponents().filter((item: any) => {
      return item.props.text.toLowerCase().search(searchStr) !== -1;
    });
    setRenderIcons(updateList);
  };

  const iconClick = (e: MouseEvent) => {
    const searchStr = e.currentTarget.children[1].textContent;
    console.log(searchStr);
    router.push({
      pathname: "/search",
      query: { keyword: searchStr },
    });
  };
  const [renderIcons, setRenderIcons] = useState(initIconComponents);

  return (
    <Layout title="Kanon Code | 検索" authUser={props.authUser}>
      <Container maxWidth="md">
        <SearchField
          formFunc={formFunc}
          func={iconClick}
          onChange={filterdIcons}
        />
        <CircleGrids renderIcons={renderIcons} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
