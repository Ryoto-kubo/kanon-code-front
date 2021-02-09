import Layout from "@/layouts";
import styled from "styled-components";
import 'modern-css-reset/dist/reset.min.css'
const Heading1 = styled.h1`
  font-size: 1.2rem;
  color: red;
`;
const IndexPage = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <Heading1 className="title">Hello Next.js 👋</Heading1>
  </Layout>
);

export default IndexPage;
