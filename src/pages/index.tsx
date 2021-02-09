import Layout from "@/layout";
import styled from "styled-components";
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
