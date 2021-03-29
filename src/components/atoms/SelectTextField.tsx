import TextField from '@material-ui/core/TextField'
import React from 'react'

type Props = {
  id: string
  value: string | number
  label: string
  renderOptions: JSX.Element[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const BaseSelectTextField: React.FC<Props> = (props) => {
  return (
    <TextField
      select
      id={props.id}
      value={props.value}
      label={props.label}
      variant="outlined"
      fullWidth={true}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={props.onChange}
    >
      {props.renderOptions}
    </TextField>
  )
}
