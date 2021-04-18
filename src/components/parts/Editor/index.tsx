import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "./editor.scss";
// import styles from "./editor.module.scss";
// import "./style.module.css";

type ToolbarIcon = {
  name: string;
  action: string | ((editor: EasyMDE) => void);
  className: string;
  title: string;
  noDisable?: boolean;
  noMobile?: boolean;
};

type ToolbarButton =
  | "bold"
  | "italic"
  | "quote"
  | "unordered-list"
  | "ordered-list"
  | "link"
  | "image"
  | "strikethrough"
  | "code"
  | "table"
  | "redo"
  | "heading"
  | "undo"
  | "heading-bigger"
  | "heading-smaller"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "clean-block"
  | "horizontal-rule"
  | "preview"
  | "side-by-side"
  | "fullscreen"
  | "guide";

const toolbar: ReadonlyArray<"|" | ToolbarButton | ToolbarIcon> = [
  "link",
  "image",
  "guide",
];

export const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  return (
    <>
      <SimpleMDE
        // className={styles.root}
        options={{
          toolbar: false,
          status: false,
        }}
        onChange={(e) => setMarkdown(e)}
      />
    </>
  );
};
