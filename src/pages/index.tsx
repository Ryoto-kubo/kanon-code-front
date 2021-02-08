import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";
const Heading1 = styled.h1`
  font-size: 1.2rem;
  color: red;
`;
const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Heading1 className="title">Hello Next.js 👋</Heading1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
