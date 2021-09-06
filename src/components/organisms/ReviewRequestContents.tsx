import { RightBorderTitle } from '@/components/molecules/RightBorderTitle';
import { SouceTree } from '@/components/molecules/SouceTree';
import { CamelContentTypes } from '@/types/global/';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import highlightjs from 'highlight.js';
import 'highlight.js/scss/vs2015.scss';
import marked from 'marked';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

type Props = {
  contents: CamelContentTypes;
};

const StyledBoxTreeWrapper = styled(Box)`
  display: none;
  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
    width: calc(100% - 700px);
    margin-right: 24px;
  }
`;
const StyledBoxCodeWrapper = styled(Box)`
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBox = styled(Box)`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: calc(100% - 200px);
  }
`;
const StyledBoxCode = styled(Box)`
  // ${props => props.theme.breakpoints.up('sm')} {
  display: block;
  height: 100%;
  // }
`;

export const ReviewRequestContents: React.FC<Props> = props => {
  const [activeStep, setActiveStep] = useState(0);
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
  const inputFileNameLists = props.contents.inputFileNameLists;
  const nodeIds = props.contents.node_ids;
  const sourceTree = props.contents.source_tree;
  const switchSourceCode = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const value = Number(event.currentTarget.value);
    setActiveStep(value);
  };
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveStep(newValue);
  };

  return (
    <>
      <Box mb={5} component='section'>
        <RightBorderTitle text='Description' fontSize={20} marginBottom={0} />
        <div className='description-wrapper'>
          <span
            dangerouslySetInnerHTML={{
              __html: marked(props.contents.description.bodyHtml),
            }}
          />
        </div>
      </Box>
      <Box component='section'>
        <RightBorderTitle text='SourceCode' fontSize={20} marginBottom={0} />
        <StyledBoxCodeWrapper>
          <StyledBoxTreeWrapper>
            <SouceTree
              nodeIds={nodeIds}
              sourceTree={sourceTree}
              switchSourceCode={switchSourceCode}
            />
          </StyledBoxTreeWrapper>
          <StyledBox>
            <Tabs
              value={activeStep}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='scrollable'
              scrollButtons={'off'}
            >
              {inputFileNameLists.map((el, index) => (
                <Tab key={index} label={el.fileName} />
              ))}
            </Tabs>
            <SwipeableViews
              index={activeStep}
              style={{
                width: '100%',
              }}
              slideStyle={{ overflow: 'unset' }}
              slideClassName='slide-childlen'
            >
              {inputFileNameLists.map((el, index) => (
                <StyledBoxCode key={index}>
                  <span
                    className='request-item-wrapper'
                    dangerouslySetInnerHTML={{
                      __html: marked(el.bodyHtml),
                    }}
                  />
                </StyledBoxCode>
              ))}
            </SwipeableViews>
          </StyledBox>
        </StyledBoxCodeWrapper>
      </Box>
    </>
  );
};
