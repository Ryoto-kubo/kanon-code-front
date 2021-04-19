import Box from "@material-ui/core/Box";
import LinkIcon from "@material-ui/icons/Link";
import PanoramaOutlinedIcon from "@material-ui/icons/PanoramaOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import "easymde/dist/easymde.min.css";
import React from "react";
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

const StyledBoxEditorWrapper = styled(Box)`
  width: 95%;
  box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
    0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  border-radius: 8px;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
const StyledBox = styled(Box)`
  padding: 0 0 0 16px;
`;
const StyledBoxCircle = styled(Box)(
  ({ theme }) => `
    background: #ffffff;
    margin-bottom: 16px;
    // background: ${theme.palette.primary.main};
    width: 40px;
    height: 40px;
    border-radius: 50px;
    color: #5f6368;
    position: relative;
    transition: all .3s;
    box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
  0px 0px 0px 1px rgba(92, 107, 192, 0.02);
    &:hover{
    }
  `
);
const StyledBoxCenter = styled(Box)`
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Editor: React.FC<Props> = (props) => {
  return (
    <>
      <StyledBoxFlex>
        <StyledBoxEditorWrapper>
          <div className="editor-header">Description</div>
          <SimpleMDE
            className="editor"
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
          <StyledBoxCircle>
            <StyledBoxCenter>
              <VisibilityOutlinedIcon />
            </StyledBoxCenter>
          </StyledBoxCircle>
          <StyledBoxCircle>
            <StyledBoxCenter>
              <LinkIcon />
            </StyledBoxCenter>
          </StyledBoxCircle>
          <StyledBoxCircle>
            <StyledBoxCenter>
              <PanoramaOutlinedIcon />
            </StyledBoxCenter>
          </StyledBoxCircle>
        </StyledBox>
      </StyledBoxFlex>
    </>
  );
};
