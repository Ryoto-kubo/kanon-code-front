import { EditorButtons } from "@/components/organisms/EditorButtons";
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
  description: string;
  activeStep: number;
  currentIndex?: number;
  handleChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  inputFileNameLists?: {
    key: string;
    isChecked: boolean;
    value: string;
    sourceCode: string;
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
  box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
    0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  border-radius: 8px;
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
`;
export const Editor: React.FC<Props> = React.memo((props) => {
  const [instance, setInstance] = useState<EasyMDE>();

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
  const insertCodeMde = () => {
    if (!instance) return;
    EasyMDE.toggleCodeBlock(instance);
  };
  const insertLinkMde = () => {
    if (!instance) return;
    EasyMDE.drawLink(instance);
  };
  const insertImageMde = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!instance) return;
    console.log(event.currentTarget.value); // 画像データ

    EasyMDE.drawImage(instance);
  };
  return (
    <>
      <StyledBoxFlex>
        <StyledBoxMaxWidth>
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
                <Tab label={el.value === "" ? "New!" : el.value} key={el.key} />
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
                options={{
                  toolbar: false,
                  status: false,
                  placeholder: "# Write in markdown",
                  nativeSpellcheck: false,
                  spellChecker: false,
                  styleSelectedText: false,
                  lineWrapping: false,
                }}
                onChange={props.onChange}
                value={props.description}
              />
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
                    __html: marked(props.description),
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
