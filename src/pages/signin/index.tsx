import { SignInContent } from '@/components/organisms/SignInContent'
// import { LayoutNoFooter } from '@/layouts/no-footer'
import Layout from '@/layouts/standard'
import { Container } from '@material-ui/core/'
import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  // position: relative;
  // top: 250px;
  // left: 50%;
  // transform: translate(-50%, -50%);
`
const IndexPage: React.FC = () => (
  <Layout title="Kanon Code | サインイン">
    <StyledContainer>
      <SignInContent />
    </StyledContainer>
  </Layout>
)
export default IndexPage
