import Snackbar from '@material-ui/core/Snackbar'
import React from 'react'

type Props = {
  isOpen: boolean
  message: string
}
export const CustomSnackbar: React.FC<Props> = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={props.isOpen}
      autoHideDuration={6000}
      message={props.message}
    />
  )
}
