import { SignInButtons } from '@/components/molecules/SignInButtons'
import { SignInTexts } from '@/components/molecules/SignInTexts'
import { Box } from '@material-ui/core/'
import React from 'react'

// const StyledBox = styled(Box)`
//   width: 100%;
//   text-align: center;
//   position: relative;
//   top: 300px;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `
export const SignInContent: React.FC = () => {
  return (
    <Box>
      <SignInTexts />
      <SignInButtons />
    </Box>
  )
}
