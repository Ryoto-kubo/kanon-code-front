import { SignInContent } from '@/components/organisms/SignInContent'
import { LayoutNoFooter } from '@/layouts/no-footer'
import { Container } from '@material-ui/core/'
import React from 'react'

const IndexPage: React.FC = () => (
  <LayoutNoFooter title="Kanon Code | サインイン">
    <Container>
      <SignInContent />
    </Container>
  </LayoutNoFooter>
)
export default IndexPage
