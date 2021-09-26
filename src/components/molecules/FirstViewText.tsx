import { ParagraphText } from '@/components/atoms/ParagraphText';
// import { TypoHeading1 } from "@/components/atoms/TypoHeading1";
import theme from '@/styles/theme';
import { Box } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';

const StyledParagraphTitle = styled('p')`
  color: ${theme.palette.primary.main};
  font-size: 45px;
`;

export const FirstViewText: React.FC = () => {
  return (
    <h1>
      <Box mb={0.5}>
        <StyledParagraphTitle>Kanon Code</StyledParagraphTitle>
      </Box>
      <ParagraphText variant='subtitle1' component='div'>
        <Box mb={1.5} fontWeight='fontWeightBold' component='p'>
          コードレビューを全てのエンジニアへ
        </Box>
      </ParagraphText>
    </h1>
  );
};
