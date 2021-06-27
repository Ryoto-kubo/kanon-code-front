import { CustomHeading2 } from '@/components/atoms/CustomHeading2'
import { SignInGoogleButton } from '@/components/molecules/SignInGoogleButtons'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import { Auth } from 'aws-amplify'
import React from 'react'
import styled from 'styled-components'
import SigninSvg from '../../../assets/illustration/signin.svg'

type Props = {
  isOpenDialog: boolean
  closeDialog: () => void
}

const StyledPairSigninSvg = styled(SigninSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`
const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
  margin-bottom: 24px;
`
const StyledBoxButtonsWrapper = styled(Box)`
  padding: 24px 24px 16px 24px;
  text-align: right;
`
const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
`
const StyledBoxMessageWrapper = styled(Box)`
  font-weight: bold;
  margin-bottom: 16px;
`

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const signin = () => {
  Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  })
}

export const SigninDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'sm'}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledBoxWrapper>
        <CustomHeading2 fontSize={20} marginBottom={0}>
          Signin
        </CustomHeading2>
      </StyledBoxWrapper>
      <StyledBoxContentWrapper>
        <DialogContent>
          <StyledPairSigninSvg />
          <StyledBoxMessageWrapper>
            レビューを購入するにはサインインが必要です。
          </StyledBoxMessageWrapper>
          <SignInGoogleButton onClick={signin} />
        </DialogContent>
      </StyledBoxContentWrapper>
      <StyledBoxButtonsWrapper></StyledBoxButtonsWrapper>
    </Dialog>
  )
}
