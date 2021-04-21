import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import LinkIcon from "@material-ui/icons/Link";
import PanoramaOutlinedIcon from "@material-ui/icons/PanoramaOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import styled from "styled-components";
import "./editor.scss";

type Props = {
  onChange: (value: string) => void | any;
};
// type ToolbarIcon = {
//   name: string;
//   action: string | ((editor: EasyMDE) => void);
//   className: string;
//   title: string;
//   noDisable?: boolean;
//   noMobile?: boolean;
// };

// type ToolbarButton =
//   | "bold"
//   | "italic"
//   | "quote"
//   | "unordered-list"
//   | "ordered-list"
//   | "link"
//   | "image"
//   | "strikethrough"
//   | "code"
//   | "table"
//   | "redo"
//   | "heading"
//   | "undo"
//   | "heading-bigger"
//   | "heading-smaller"
//   | "heading-1"
//   | "heading-2"
//   | "heading-3"
//   | "clean-block"
//   | "horizontal-rule"
//   | "preview"
//   | "side-by-side"
//   | "fullscreen"
//   | "guide";

// const toolbar: ReadonlyArray<"|" | ToolbarButton | ToolbarIcon> = [
//   "preview",
//   "image",
//   "guide",
// ];

const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxEditorWrapper = styled(Box)`
  width: 100%;
  box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
    0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  border-radius: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 95%;
  }
`;
const StyledBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-top: 0px;
    display: inline-block;
    padding: 0 0 0 16px;
  }
`;
const StyledIconButton = styled(IconButton)`
  margin-left: 8px;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: initial;
  &:hover {
    background: none;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 16px;
    margin-left: 0px;
    display: block;
  }
`;
const StyledBoxCircle = styled(Box)`
  background: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  color: #5f6368;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
    0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.7),
      0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 0px;
  }
`;
const StyledBoxCenter = styled(Box)`
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  const [instance, setInstance] = useState<EasyMDE>();

  const getInstance = (instance: EasyMDE) => {
    setInstance(instance);
  };

  const switchPreview = () => {
    if (!instance) return;
    // instance.togglePreview();
  };

  const insertCodeMde = () => {
    if (!instance) return;
    EasyMDE.toggleCodeBlock(instance);
    console.log(instance);

    // instance.toggleCodeBlock();
  };
  const insertLinkMde = () => {
    if (!instance) return;
    // instance.drawLink();
  };
  const insertImageMde = () => {
    if (!instance) return;
    // instance.drawImage();
  };
  return (
    <>
      <StyledBoxFlex>
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
        <StyledBox>
          <Tooltip title="Preview" arrow>
            <StyledIconButton
              disableFocusRipple
              disableRipple
              onClick={switchPreview}
            >
              <StyledBoxCircle>
                <StyledBoxCenter>
                  <VisibilityOutlinedIcon />
                </StyledBoxCenter>
              </StyledBoxCircle>
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Code" arrow>
            <StyledIconButton
              disableFocusRipple
              disableRipple
              onClick={insertCodeMde}
            >
              <StyledBoxCircle>
                <StyledBoxCenter>
                  <CodeOutlinedIcon />
                </StyledBoxCenter>
              </StyledBoxCircle>
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Link" arrow>
            <StyledIconButton
              disableFocusRipple
              disableRipple
              onClick={insertLinkMde}
            >
              <StyledBoxCircle>
                <StyledBoxCenter>
                  <LinkIcon />
                </StyledBoxCenter>
              </StyledBoxCircle>
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Image" arrow>
            <StyledIconButton
              disableFocusRipple
              disableRipple
              onClick={insertImageMde}
            >
              <StyledBoxCircle>
                <StyledBoxCenter>
                  <PanoramaOutlinedIcon />
                </StyledBoxCenter>
              </StyledBoxCircle>
            </StyledIconButton>
          </Tooltip>
        </StyledBox>
      </StyledBoxFlex>
    </>
  );
};
