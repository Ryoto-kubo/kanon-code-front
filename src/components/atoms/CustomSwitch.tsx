import Switch from '@material-ui/core/Switch'
import React from 'react'

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const CustomSwitch: React.FC<Props> = (props) => {
  return (
    <Switch
      {...props}
      color="primary"
      inputProps={{ 'aria-label': 'primary' }}
    />
  )
}
