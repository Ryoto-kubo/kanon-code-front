import { FirstView } from '@/components/organisms/FirstView'
import Layout from '@/layouts/standard'
import { Container } from '@material-ui/core/'
import React from 'react'

const IndexPage: React.FC = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <Container>
      <FirstView />
    </Container>
  </Layout>
)
export default IndexPage
