import { ValidMessage } from "@/components/molecules/ValidMessage";
import { InputTagWrapper } from "@/components/organisms/InputTagWrapper";
import { Editor } from "@/components/parts/Editor";
import LayoutPosts from "@/layouts/posts";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import marked from "marked";
import React, { useState } from "react";

type Params = {
  title: string;
  tag: string;
  tagList: string[];
  description: string;
  sourceCode: string;
};

// export const getServerSideProps = async () => ({
//   props: {
//     layout: "none",
//     title: "none",
//   },
// });

const IndexPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    title: "",
    tag: "",
    tagList: [],
    description: "",
    sourceCode: "",
  });
  const [stateValid, setStateValid] = useState({
    isValidTitle: false,
    isValidTagList: false,
    isValidDescription: false,
    isValidSourceCode: false,
  });

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setStateValid({ ...stateValid, isValidTitle: title.length > 32 });
    setParams({ ...params, title: title });
  };
  const changeTagList = (value: any) => {
    setParams({ ...params, tagList: value });
  };
  const changeDescritption = (value: string) => {
    console.log(value);

    setParams({ ...params, description: value });
  };

  return (
    <LayoutPosts title="Kanon Code | レビュー依頼">
      <Container maxWidth="md">
        <Box component="section">
          <Box mb={3} className="title-wrapper">
            <Box mb={0.5}>
              <TextField
                id="title"
                type="text"
                fullWidth
                inputProps={{ style: { fontSize: 24, fontWeight: "bold" } }}
                value={params.title}
                onChange={changeTitle}
                placeholder="Title"
              />
            </Box>
            {stateValid.isValidTitle && (
              <ValidMessage validText="32文字以下で入力してください" />
            )}
          </Box>
          <Box mb={3} className="tag-list-wrapper">
            <InputTagWrapper changeTagList={changeTagList} />
          </Box>
          <Box mb={3} className="description-wrapper">
            <Box>
              <Editor onChange={changeDescritption} />
            </Box>
            <div id="body">
              <span
                dangerouslySetInnerHTML={{ __html: marked(params.description) }}
              />
            </div>
          </Box>
        </Box>
      </Container>
    </LayoutPosts>
  );
};
export default IndexPage;
