import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
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
  // useEffect(() => {
  // });

  return (
    <>
      <Box mb={2}>
        <StyledBoxTitleWrapper>
          <CustomHeading2 fontSize={18} marginBottom={0.5}>
            Description
          </CustomHeading2>
        </StyledBoxTitleWrapper>
        <span
          dangerouslySetInnerHTML={{
            __html: marked(props.contents.description.body_html),
          }}
        />
      </Box>
      <StyledBoxTitleWrapper>
        <CustomHeading2 fontSize={18} marginBottom={0.5}>
          SourceCode
        </CustomHeading2>
      </StyledBoxTitleWrapper>
      <span
        dangerouslySetInnerHTML={{
          __html: marked(props.contents.input_file_name_lists[0].body_html),
        }}
      />
    </>
  );
};
