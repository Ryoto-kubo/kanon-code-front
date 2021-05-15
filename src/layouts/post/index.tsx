import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { ThePostHeader } from '@/components/common/header/post'
import { UserType } from '@/consts/type'
import { Toolbar } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  title: string
  currentUser: null | UserType
  draftContents: () => void
}

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`

const LayoutPost = ({ children, title, currentUser, draftContents }: Props) => {
  const router = useRouter()
  if (currentUser === null) {
    router.push('/')
    return null
  }

  return (
    <>
      <CommonHead title={title} />
      <ThePostHeader draftContents={draftContents} />
      <Toolbar />
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  )
}
export default LayoutPost
