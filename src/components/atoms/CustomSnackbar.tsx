import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

type Props = {
  isOpen: boolean
  closeSnackBar: () => void
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const CustomSnackbar: React.FC<Props> = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={props.isOpen}
      onClose={props.closeSnackBar}
      disableWindowBlurListener={false}
    >
      <Alert onClose={props.closeSnackBar} severity="error">
        {props.children}
      </Alert>
    </Snackbar>
  )
}
