import { LinkGithubButton } from "@/components/molecules/LinkGithubButton";
import { ValidMessage } from "@/components/molecules/ValidMessage";
import { InputTagWrapper } from "@/components/organisms/InputTagWrapper";
// import { Editor } from "@/components/parts/Editor";
import LayoutPosts from "@/layouts/posts";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import styled from "styled-components";
import "./style.scss";
const Editor = dynamic(
  () => import("@/components/parts/Editor").then((module) => module.Editor),
  { ssr: false }
);

type Params = {
  title: string;
  tag: string;
  tagList: string[];
  description: string;
  sourceCode: string;
};
const StyledContainer = styled(Container)`
  max-width: 1200px;
`;
const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxInputGroupWrapper = styled(Box)`
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
    margin-right: 24px;
    width: 30%;
  }
`;
const StyledBoxInputWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledIconButton = styled(IconButton)`
  width: 30px;
  height: 30px;
`;
const StyledBoxCordEditorWrapper = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 70%;
  }
`;
const IndexPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
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
    setParams({ ...params, description: value });
  };
  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return (
    <LayoutPosts title="Kanon Code | レビュー依頼">
      <StyledContainer>
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
            <Editor
              id="editor"
              headerText="Description"
              onChange={changeDescritption}
              setActiveStep={setActiveStep}
              description={params.description}
              activeStep={activeStep}
            />
          </Box>
          <Box mb={3} className="source-code-wrapper">
            <StyledBoxFlex>
              <StyledBoxInputGroupWrapper>
                <Box className="github-wrapper" mb={1}>
                  <Box mb={1}>
                    <LinkGithubButton onClick={linkOnGithub} />
                  </Box>
                  <p className="notification">
                    ※
                    Githubに連携するとディレクトリ構成の中からファイルを選択できるようになります。
                  </p>
                </Box>
                <Box className="input-wrapper">
                  <StyledBoxInputWrapper mb={1.5}>
                    <Box mr={1} width="100%">
                      <TextField variant="outlined" size="small" fullWidth />
                    </Box>
                    <StyledIconButton color="primary">
                      <AddOutlinedIcon />
                    </StyledIconButton>
                  </StyledBoxInputWrapper>
                  <StyledBoxInputWrapper mb={1.5}>
                    <Box mr={1} width="100%">
                      <TextField variant="outlined" size="small" fullWidth />
                    </Box>
                    <StyledIconButton color="primary">
                      <AddOutlinedIcon />
                    </StyledIconButton>
                  </StyledBoxInputWrapper>
                  <StyledBoxInputWrapper mb={1.5}>
                    <Box mr={1} width="100%">
                      <TextField variant="outlined" size="small" fullWidth />
                    </Box>
                    <StyledIconButton color="primary">
                      <AddOutlinedIcon />
                    </StyledIconButton>
                  </StyledBoxInputWrapper>
                </Box>
              </StyledBoxInputGroupWrapper>
              <StyledBoxCordEditorWrapper>
                <Editor
                  id="cord-editor"
                  headerText="Source Code"
                  onChange={changeDescritption}
                  setActiveStep={setActiveStep}
                  description={params.description}
                  activeStep={activeStep}
                />
              </StyledBoxCordEditorWrapper>
            </StyledBoxFlex>
          </Box>
        </Box>
      </StyledContainer>
    </LayoutPosts>
  );
};
export default IndexPage;
