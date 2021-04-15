// import { CustomInputLabel } from '@/components/atoms/InuptLabel'
import { UserImgIcon } from '@/components/atoms/UserImgIcon'
import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CachedRounded from '@material-ui/icons/CachedRounded'
import React from 'react'
import styled from 'styled-components'

type Props = {
  htmlFor: string
  picture: string
}

const useStyles = makeStyles(() => ({
  size: {
    width: '60px',
    height: '60px',
    margin: 'auto',
  },
}))

const StyledBoxHover = styled(Box)`
  transition: all 0.2s;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`
const StyledSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`

export const FileExChange: React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    // <CustomInputLabel htmlFor={props.htmlFor}>
    <div>
      <TextField
        id={props.htmlFor}
        name={props.htmlFor}
        type="file"
        style={{ display: 'none' }}
      />
      <Box>
        <Box mb={1}>
          <UserImgIcon className={classes.size} picture={props.picture} />
        </Box>
        <StyledBoxHover display="flex" alignItems="center">
          <Box mr={0.5} height={20}>
            <CachedRounded fontSize="small" />
          </Box>
          <StyledSpan>アイコン変更</StyledSpan>
        </StyledBoxHover>
      </Box>
    </div>
    // </CustomInputLabel>
  )
}
