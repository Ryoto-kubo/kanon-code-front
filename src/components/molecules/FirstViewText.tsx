import { Heading1 } from '@/components/atoms/Heading1'
import { ParagraphText } from '@/components/atoms/ParagraphText'
import { Box } from '@material-ui/core/'
import React from 'react'

export const FirstViewText: React.FC = () => {
  return (
    <>
      <Box mb={0.5}>
        <Heading1>Kanon Code</Heading1>
      </Box>
      <ParagraphText variant="subtitle1" component="div">
        <Box mb={1.5} fontWeight="fontWeightBold" component="p">
          コードレビューをもらえる、おくれる。
        </Box>
      </ParagraphText>
    </>
  )
}
