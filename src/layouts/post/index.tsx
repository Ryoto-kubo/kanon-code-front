import { TheFooter } from '@/components/common/footer/index'
import { CommonHead } from '@/components/common/head/index'
import { ThePostHeader } from '@/components/common/header/post'
import { UserType } from '@/consts/type'
import { Toolbar } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type ButtonText = Readonly<
  '投稿設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>

type Props = {
  children: ReactNode
  title: string
  currentUser: null | UserType
  registerContent: () => void
  draftContent: () => void
  previousPage: () => void
  updateButtonText: (value: ButtonText) => void
  buttonText: ButtonText
}

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`

const LayoutPost = ({
  children,
  title,
  currentUser,
  registerContent,
  draftContent,
  previousPage,
  updateButtonText,
  buttonText,
}: Props) => {
  const router = useRouter()
  if (currentUser === null) {
    router.push('/')
    return null
  }

  return (
    <>
      <CommonHead title={title} />
      <ThePostHeader
        registerContent={registerContent}
        draftContent={draftContent}
        previousPage={previousPage}
        updateButtonText={updateButtonText}
        buttonText={buttonText}
      />
      <Toolbar />
      <StyleBoxMain mt={4} component="main">
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  )
}
export default LayoutPost
