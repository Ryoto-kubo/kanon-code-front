import { CommonHead } from '@/components/common/head/index'
import { TheNoStickyHeader } from '@/components/common/header/no-sticky'
// import { Toolbar } from '@material-ui/core'
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
    <TheNoStickyHeader />
    {/* <Toolbar /> */}
    <StyledMain>{children}</StyledMain>
  </>
)
