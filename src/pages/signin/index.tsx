import { Heading1 } from '@/components/atoms/Heading1'
import { ParagraphText } from '@/components/atoms/ParagraphText'
import { LayoutNoFooter } from '@/layouts/no-footer'
import { Box, Container } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'
import GithubSvg from '../../assets/logo/github.svg'
import GoogleLogoSvg from '../../assets/logo/google.svg'

const StyledBox = styled(Box)`
  text-align: center;
`
const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    <Container>
      <StyledBox>
        <Heading1 fontSize={48}>Sing in</Heading1>
        <ParagraphText fontSize={16} fontWeight="normal">
          githubアカウントもしくはgoogleアカウントで新規登録、ログインができます。
        </ParagraphText>
        <GoogleLogoSvg width={25} />
        <GithubSvg width={25} height={25} />
      </StyledBox>
    </Container>
  </LayoutNoFooter>
)
export default IndexPage
