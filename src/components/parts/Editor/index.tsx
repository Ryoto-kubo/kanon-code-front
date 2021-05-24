import { EditorButtons } from "@/components/organisms/EditorButtons";
import { errorMessages } from "@/consts/error-messages.ts";
import { getPreSignedUrl } from "@/utils/api/get-presigned-url";
import { PrepareImageBeforePost } from "@/utils/prepare-image-before-post";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import highlightjs from "highlight.js";
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
  name: string;
  headerText: string;
  changeActiveStep: (value: number) => void;
  onChange: (value: string) => void | any;
  value: string;
  activeStep: number;
  isValid: boolean;
  uploadImageToS3: (presignedUrl: string, image: any) => void;
  MAX_LENGTH: number;
  currentIndex?: number;
  handleTabChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  inputFileNameLists?: {
    key: string;
    fileName: string;
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
  width: 100%;
  border-radius: 8px;
  transition: all 0.3s;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: calc(100% - 60px);
  }
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
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // useEffect(() => {
  marked.setOptions({
    highlight: function (code, lang) {
      return highlightjs.highlightAuto(code, [lang]).value;
    }, // シンタックスハイライトに使用する関数の設定
    pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
    gfm: true, // GitHub Flavored Markdownを使用
    breaks: true, // falseにすると改行入力は末尾の半角スペース2つになる
    sanitize: true, // trueにすると特殊文字をエスケープする
    silent: false, // trueにするとパースに失敗してもExceptionを投げなくなる
  });
  // }, []);

  const getInstance = (instance: EasyMDE) => {
    setInstance(instance);
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
  const validImageSizeAndExtention = (instance: PrepareImageBeforePost) => {
    const isValidImageSize = instance.validImageSize();
    const isValidFileExtention = instance.validImageExtention();
    return isValidImageSize && isValidFileExtention;
  };
  const getCurrentCursorPosition = (editorInstance: EasyMDE) => {
    const cursorPositions = editorInstance.codemirror.getCursor();
    return ({
      line: cursorPositions.line,
      ch: cursorPositions.ch,
    } = editorInstance.codemirror.getCursor());
  };
  const executeInsertDrawImage = (
    editorInstance: EasyMDE,
    newFileName: string
  ) => {
    EasyMDE.drawImage(editorInstance);
    const protocol = "https://";
    const { line, ch } = getCurrentCursorPosition(editorInstance);
    editorInstance.codemirror.setSelection(
      {
        line: line,
        ch: ch,
      },
      {
        line: line,
        ch: ch + protocol.length,
      }
    );
    editorInstance.codemirror.replaceSelection(
      `${process.env.NEXT_PUBLIC_BUCKET_URL}upload/${newFileName}`
    );
  };
  const moveCursor = (editorInstance: EasyMDE, moveableNumber: number) => {
    const { line, ch } = getCurrentCursorPosition(editorInstance);
    editorInstance.codemirror.setCursor({
      line: line,
      ch: ch + moveableNumber,
    });
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
    setIsUploading(true);
    const err = new Error();
    const files = event.target.files!;
    for (const file of Object.values(files)) {
      const prepareImageBeforePost = new PrepareImageBeforePost(file);
      const isValid = validImageSizeAndExtention(prepareImageBeforePost);
      if (!isValid) continue;
      const newFileName = prepareImageBeforePost.createNewFileName();
      try {
        const compressedFile = await prepareImageBeforePost.compressionImage();
        if (!compressedFile) throw err;
        const response = await getPreSignedUrl(newFileName);
        if (response.status !== 200) throw err;
        const presignedUrl = response.data.presignedUrl;
        await props.uploadImageToS3(presignedUrl, compressedFile);
        executeInsertDrawImage(instance, newFileName);
        moveCursor(instance, 1);
      } catch (error) {
        setIsUploading(false);
        alert(errorMessages.SYSTEM_ERROR);
        console.error(error);
      }
    }
    setIsUploading(false);
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
              onChange={props.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons={"off"}
            >
              {props.inputFileNameLists.map((el) => (
                <Tab
                  label={el.fileName === "" ? "New!" : el.fileName}
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
                {props.activeStep === 1 && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: marked(props.value),
                    }}
                  />
                )}
              </StyledBoxPreviewWrapper>
            </StyledBoxEditorWrapper>
          </SwipeableViews>
        </StyledBoxMaxWidth>
        <EditorButtons
          name={props.name}
          switchPreview={switchPreview}
          insertCodeMde={insertCodeMde}
          insertLinkMde={insertLinkMde}
          insertImageMde={insertImageMde}
          isUploading={isUploading}
        />
      </StyledBoxFlex>
    </>
  );
});
