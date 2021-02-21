import { SignInContent } from '@/components/organisms/SignInContent'
import { LayoutNoFooter } from '@/layouts/no-footer'
import { Container } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  position: relative;
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
`
const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    <StyledContainer>
      <SignInContent />
    </StyledContainer>
  </LayoutNoFooter>
)
export default IndexPage
