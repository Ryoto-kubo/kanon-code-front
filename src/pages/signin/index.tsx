import { SignInContent } from '@/components/organisms/SignInContent'
import { LayoutNoFooter } from '@/layouts/no-footer'
// import Layout from '@/layouts/standard'
// import { Container } from '@material-ui/core/'
import React from 'react'
// import styled from 'styled-components'

// const StyledContainer = styled(Container)`
//   width: 100%;
//   text-align: center;
//   margin-top: 70px;
//   margin-bottom: 40px;
// `
const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    {/* <StyledContainer> */}
    <SignInContent />
    {/* </StyledContainer> */}
  </LayoutNoFooter>
)
export default IndexPage
