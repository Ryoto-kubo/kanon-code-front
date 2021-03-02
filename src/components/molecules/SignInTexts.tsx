import { Heading1 } from '@/components/atoms/Heading1'
import { ParagraphText } from '@/components/atoms/ParagraphText'
import { Box } from '@material-ui/core/'
import React from 'react'

export const SignInTexts: React.FC = () => {
  return (
    <Box mb={4}>
      <Box mb={2}>
        <Heading1>Sign in</Heading1>
      </Box>
      <ParagraphText variant="subtitle1" component="p">
        GoogleアカウントもしくはGithubアカウントで新規登録、ログインができます。
      </ParagraphText>
    </Box>
  )
}
