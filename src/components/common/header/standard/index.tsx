import { CustomAppBar } from '@/components/atoms/AppBar'
import { KanonCodeLogo } from '@/components/atoms/Logo'
import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { Box } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
`

export const TheStndardHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <StyledBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <KanonCodeLogo />
        <CustomSolidButton sizing="small">サインイン</CustomSolidButton>
      </StyledBox>
    </CustomAppBar>
  )
}
