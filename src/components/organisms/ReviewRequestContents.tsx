import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { SouceTree } from "@/components/molecules/SouceTree";
import theme from "@/styles/theme";
import { ContentTypes } from "@/types/global/";
import Box from "@material-ui/core/Box";
import highlightjs from "highlight.js";
import "highlight.js/scss/vs2015.scss";
import marked from "marked";
import React from "react";
import styled from "styled-components";

type Props = {
  contents: ContentTypes;
};

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 16px;
  padding-left: 8px;
  border-left: 5px solid ${theme.palette.primary.main};
`;

const StyledBoxTreeWrapper = styled(Box)`
  display: none;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: block;
  }
`;
const StyledBoxCodeWrapper = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxCode = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: calc(100% - 20px);
  }
`;

export const ReviewRequestContents: React.FC<Props> = (props) => {
  marked.setOptions({
    highlight: function (code, lang) {
      return highlightjs.highlightAuto(code, [lang]).value;
    }, // シンタックスハイライトに使用する関数の設定
    pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
    gfm: true, // GitHub Flavored Markdownを使用
    breaks: true, // falseにすると改行入力は末尾の半角スペース2つになる
    sanitize: false, // trueにすると特殊文字をエスケープする
    silent: false, // trueにするとパースに失敗してもExceptionを投げなくなる
  });
  const inputFileNameLists = props.contents.input_file_name_lists;

  return (
    <>
      <Box mb={5}>
        <StyledBoxTitleWrapper component="section">
          <CustomHeading2 fontSize={20} marginBottom={0}>
            Description
          </CustomHeading2>
        </StyledBoxTitleWrapper>
        <div className="description-wrapper">
          <span
            dangerouslySetInnerHTML={{
              __html: marked(props.contents.description.body_html),
            }}
          />
        </div>
      </Box>
      <StyledBoxTitleWrapper component="section">
        <CustomHeading2 fontSize={20} marginBottom={0}>
          SourceCode
        </CustomHeading2>
      </StyledBoxTitleWrapper>
      <StyledBoxCodeWrapper>
        <StyledBoxTreeWrapper>
          <SouceTree inputFileNameLists={inputFileNameLists} />
        </StyledBoxTreeWrapper>
        <StyledBoxCode>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(inputFileNameLists[0].body_html),
            }}
          />
        </StyledBoxCode>
      </StyledBoxCodeWrapper>
    </>
  );
};
