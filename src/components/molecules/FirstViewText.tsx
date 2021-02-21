import { Heading1 } from '@/components/atoms/Heading1'
import { ParagraphText } from '@/components/atoms/ParagraphText'
import { Box } from '@material-ui/core/'
import React from 'react'

export const FirstViewText: React.FC = () => {
  return (
    <>
      <ParagraphText fontSize={16} fontWeight="bold">
        今より一歩前に。
      </ParagraphText>
      <Box mb={0.5}>
        <Heading1 fontSize={48}>Kanon Code</Heading1>
      </Box>
      <Box mb={1.5}>
        <ParagraphText fontSize={18} fontWeight="bold" isPrimary={true}>
          コードレビューをもらえる、おくれる。
        </ParagraphText>
      </Box>
    </>
  )
}
