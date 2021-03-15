import { Grid, Grow } from '@material-ui/core/'
import React from 'react'

type Props = {
  renderIcons: Array<any>
}

export const CircleGrids: React.FC<Props> = (props) => {
  return (
    <Grow in={true}>
      <Grid container spacing={3}>
        {props.renderIcons}
      </Grid>
    </Grow>
  )
}
