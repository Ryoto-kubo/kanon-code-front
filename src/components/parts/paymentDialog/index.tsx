import { CustomHeading2 } from '@/components/atoms/CustomHeading2'
import { Price } from '@/components/atoms/Price'
import { CustomSolidButton } from '@/components/atoms/SolidButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  name: string
  iconSrc: string
  price: number
  width: string
  height: string
  isOpenDialog: boolean
  closeDialog: () => void
  payment: () => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`
const StyledBoxButtonsWrapper = styled(Box)`
  padding: 24px 24px 16px 24px;
  text-align: right;
`
const StyledBoxFlex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`
const StyledBoxTitleWrapper = styled(Box)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  display: inline-block;
  border-bottom: 1px dashed #a8abb1;
`
const StyledBoxBg = styled(Box)`
  background: #fafafa;
`

export const PaymentDialog: React.FC<Props> = (props) => {
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
          レビュー購入
        </CustomHeading2>
        <Price color={'#EC576B'} text={`¥${props.price}`} />
      </StyledBoxWrapper>
      <StyledBoxBg>
        <DialogContent>
          <StyledBoxFlex>
            <Box component="a" height={`${props.height}`}>
              <img
                src={props.iconSrc}
                style={{
                  borderRadius: '50px',
                  width: `${props.width}`,
                  height: `${props.height}`,
                  marginRight: '8px',
                }}
              />
            </Box>
            <Box component="p">{props.name}</Box>
          </StyledBoxFlex>
          <Box mb={1} textAlign="center">
            <StyledBoxTitleWrapper>{props.title}</StyledBoxTitleWrapper>
          </Box>
        </DialogContent>
      </StyledBoxBg>
      <StyledBoxButtonsWrapper>
        <Box mr={1} display="inline-block">
          <Button onClick={props.closeDialog} color="default">
            キャンセル
          </Button>
        </Box>
        <CustomSolidButton
          sizing="medium"
          onClick={() => props.payment()}
          color="secondary"
        >
          レビューを購入する
        </CustomSolidButton>
      </StyledBoxButtonsWrapper>
    </Dialog>
  )
}
