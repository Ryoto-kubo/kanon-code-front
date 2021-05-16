import { EditorButtons } from "@/components/organisms/EditorButtons";
import { apis } from "@/consts/api/";
import { axios } from "@/utils/axios";
// import theme from '@/styles/theme'
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import "./editor.scss";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const SOURCE_CODE = "Source Code";

type Props = {
  id: string;
  headerText: string;
  changeActiveStep: (value: number) => void;
  onChange: (value: string) => void | any;
  value: string;
  activeStep: number;
  isValid: boolean;
  uploadImageToS3: (presignedUrl: string, image: any) => void;
  MAX_LENGTH: number;
  maxWidth?: string;
  currentIndex?: number;
  handleChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  inputFileNameLists?: {
    key: string;
    value: string;
    sourceCode: string;
    bodyHtml: string;
    isValid: boolean;
  }[];
};

const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxMaxWidth = styled(Box)`
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s;
`;
const StyledBoxPreviewWrapper = styled(Box)`
  padding: 16px;
`;
const StyledBoxEditorWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 100%;
  }
`;
const StyledTabs = styled(Tabs)`
  background: #ffffff;
  width: 100%;
  max-width: 733.59px;
  border-radius: 8px 8px 0 0;
`;
export const Editor: React.FC<Props> = React.memo((props) => {
  const [instance, setInstance] = useState<EasyMDE>();

  const getInstance = (instance: EasyMDE) => {
    setInstance(instance);
  };
  const getPreSignedUrl = async () => {
    return await axios.get(apis.CREATE_PRESIGNED_URL);
  };
  const switchPreview = () => {
    if (!instance) return;
    const SHOW_EDITOR = 0;
    const SHOW_PREVIEW = 1;
    if (props.activeStep === SHOW_PREVIEW) {
      props.changeActiveStep(SHOW_EDITOR);
    } else if (props.activeStep === SHOW_EDITOR) {
      props.changeActiveStep(SHOW_PREVIEW);
    }
  };
  const insertCodeMde = () => {
    if (!instance) return;
    EasyMDE.toggleCodeBlock(instance);
  };
  const insertLinkMde = () => {
    if (!instance) return;
    EasyMDE.drawLink(instance);
  };
  const insertImageMde = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!instance) return;
    const err = new Error();
    const file = event.target.files![0];
    console.log(file, "file");
    try {
      // const params = new FormData();
      const response = await getPreSignedUrl();
      if (response.status !== 200) err;
      const presignedUrl = response.data.presignedUrl;
      // params.append("file", file);
      const result = await props.uploadImageToS3(presignedUrl, file);
      console.log(result, "result");
    } catch (error) {
      console.error(error, "error");
    }

    EasyMDE.drawImage(instance);
  };
  return (
    <>
      <StyledBoxFlex>
        <StyledBoxMaxWidth
          className={!props.isValid ? "error-shadow" : "default-shadow"}
        >
          {props.inputFileNameLists && (
            <StyledTabs
              value={props.currentIndex}
              onChange={props.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons={"off"}
            >
              {props.inputFileNameLists.map((el) => (
                <Tab
                  label={el.value === "" ? "New!" : el.value}
                  key={el.key}
                  className={!el.isValid ? "error" : ""}
                />
              ))}
            </StyledTabs>
          )}
          <SwipeableViews
            index={props.activeStep}
            style={{
              borderRadius: props.headerText === SOURCE_CODE ? "0px" : "8px",
            }}
            slideStyle={{ overflow: "unset" }}
            slideClassName="slide-childlen"
          >
            <StyledBoxEditorWrapper>
              <div
                className={`editor-header ${
                  props.headerText === SOURCE_CODE ? "" : "border_radius"
                }`}
              >
                {props.headerText}
              </div>
              <SimpleMDE
                id={props.id}
                className="editor"
                getMdeInstance={getInstance}
                onChange={props.onChange}
                value={props.value}
                options={{
                  toolbar: false,
                  status: false,
                  placeholder: "# Write in markdown",
                  nativeSpellcheck: false,
                  spellChecker: false,
                  styleSelectedText: false,
                  lineWrapping: true,
                }}
              />
              <Box textAlign="right" p={1} paddingRight={"10px"}>
                {props.value.length} /&nbsp;
                <Box
                  component="span"
                  fontWeight="bold"
                  className={!props.isValid ? "error" : ""}
                >
                  {props.MAX_LENGTH}
                </Box>
              </Box>
            </StyledBoxEditorWrapper>
            <StyledBoxEditorWrapper>
              <div
                className={`preview-header ${
                  props.headerText === SOURCE_CODE ? "" : "border_radius"
                }`}
              >
                Preview
              </div>
              <StyledBoxPreviewWrapper id="body">
                <span
                  dangerouslySetInnerHTML={{
                    __html: marked(props.value),
                  }}
                />
              </StyledBoxPreviewWrapper>
            </StyledBoxEditorWrapper>
          </SwipeableViews>
        </StyledBoxMaxWidth>
        <EditorButtons
          switchPreview={switchPreview}
          insertCodeMde={insertCodeMde}
          insertLinkMde={insertLinkMde}
          insertImageMde={insertImageMde}
        />
      </StyledBoxFlex>
    </>
  );
});
