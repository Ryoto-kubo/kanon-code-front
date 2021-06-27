import Box from '@material-ui/core/Box'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import ArticleSvg from '../../../assets/illustration/article.svg'

type Props = {
  marginBottom: number
  children: ReactNode
}
const StyledArticleSvg = styled(ArticleSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 80%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 350px;
  }
`
const StyledBox = styled(Box)`
  width: 100%;
  text-align: center;
`
export const NonArticleIllustration = (props: Props) => {
  return (
    <StyledBox>
      <Box>
        <StyledArticleSvg />
      </Box>
      <Box mb={props.marginBottom} lineHeight={1.8}>
        まだレビューを行っていません。
        <br />
        レビューを待っている投稿を探しにいきましょう！
      </Box>
      {props.children}
    </StyledBox>
  )
}
