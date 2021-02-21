import { SignInButtons } from '@/components/molecules/SignInButtons'
import { SignInTexts } from '@/components/molecules/SignInTexts'
import { LayoutNoFooter } from '@/layouts/no-footer'
import { Box, Container } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'
const StyledBox = styled(Box)`
  text-align: center;
`
const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    <Container>
      <StyledBox>
        <SignInTexts />
        <SignInButtons />
      </StyledBox>
    </Container>
  </LayoutNoFooter>
)
export default IndexPage
