import { EditorButtons } from "@/components/organisms/EditorButtons";
import Box from "@material-ui/core/Box";
import marked from "marked";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import "./editor.scss";
import "./node_modules/easymde/dist/easymde.min.css";

type Props = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  onChange: (value: string) => void | any;
  description: string;
  activeStep: number;
};

const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxPreviewWrapper = styled(Box)`
  padding: 16px;
`;
const StyledBoxEditorWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  // filter: drop-shadow(0 0 0.75rem crimson);
  // filter: drop-shadow(
  //   0px 8px 16px -2px rgba(92, 107, 192, 0.2),
  //   0px 0px 0px 1px rgba(92, 107, 192, 0.02)
  // );
  // box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
  //   0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  // border-radius: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 100%;
  }
`;

export const Editor: React.FC<Props> = (props) => {
  //   const CodeMirror = dynamic(() => {
  //     import('codemirror/mode/css/css')
  //     import('../../../../node_modules/codemirror/mode/xml/xml.js')
  //     import('codemirror/mode/javascript/javascript')
  //     import('codemirror/mode/css/css')
  //     import('codemirror/mode/markdown/markdown')
  //     import('codemirror/theme/material-ocean.css')
  //     return import('react-codemirror')
  // }, {ssr: false})

  const [instance, setInstance] = useState<any>();

  const getInstance = (instance: any) => {
    setInstance(instance);
  };
  const switchPreview = () => {
    if (!instance) return;
    const SHOW_EDITOR = 0;
    const SHOW_PREVIEW = 1;
    if (props.activeStep === SHOW_PREVIEW) {
      props.setActiveStep(SHOW_EDITOR);
    } else if (props.activeStep === SHOW_EDITOR) {
      props.setActiveStep(SHOW_PREVIEW);
    }
  };
  const insertCodeMde = () => {
    if (!instance) return;
    instance.toggleCodeBlock();
  };
  const insertLinkMde = () => {
    if (!instance) return;
    instance.drawLink();
  };
  const insertImageMde = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!instance) return;
    console.log(event.currentTarget.value); // 画像データ

    instance.drawImage();
  };
  return (
    <>
      <StyledBoxFlex>
        <SwipeableViews
          index={props.activeStep}
          style={{
            width: "100%",
            boxShadow: `0px 8px 16px -2px rgba(92, 107, 192, 0.2),
          0px 0px 0px 1px rgba(92, 107, 192, 0.02)`,
            borderRadius: 8,
          }}
          slideStyle={{ overflow: "unset" }}
          slideClassName="slide-childlen"
        >
          <StyledBoxEditorWrapper>
            <div className="editor-header">Description</div>
            <SimpleMDE
              id="editor"
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
            />
          </StyledBoxEditorWrapper>
          <StyledBoxEditorWrapper>
            <div className="preview-header">Preview</div>
            <StyledBoxPreviewWrapper id="body">
              <span
                dangerouslySetInnerHTML={{
                  __html: marked(props.description),
                }}
              />
            </StyledBoxPreviewWrapper>
          </StyledBoxEditorWrapper>
        </SwipeableViews>
        <EditorButtons
          switchPreview={switchPreview}
          insertCodeMde={insertCodeMde}
          insertLinkMde={insertLinkMde}
          insertImageMde={insertImageMde}
        />
      </StyledBoxFlex>
    </>
  );
};
