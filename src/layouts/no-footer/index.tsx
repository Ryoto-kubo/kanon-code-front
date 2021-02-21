import { CommonHead } from '@/components/common/head/index'
import { TheStndardHeader } from '@/components/common/header/standard'
import { Toolbar } from '@material-ui/core'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  title: string
}
const StyledMain = styled.main`
  background: #ffffff;
`

export const LayoutNoFooter = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <>
    <CommonHead title={title} />
    <TheStndardHeader />
    <Toolbar />
    <StyledMain>{children}</StyledMain>
  </>
)
