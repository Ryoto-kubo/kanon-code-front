import TextField from '@material-ui/core/TextField'
import React from 'react'

export const FileTextField = () => {
  return (
    <TextField
      id="avatar"
      name="avatar"
      type="file"
      style={{ display: 'none' }}
    />
  )
}
