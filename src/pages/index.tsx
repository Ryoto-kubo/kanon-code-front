import Layout from "@/layouts";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
const StyledHeading1 = styled.h1`
  font-size: 1.2rem;
  color: red;
`;
const StyledPaperItem = styled(Paper)`
  margin: 0 0 1.25rem;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const IndexPage = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <StyledHeading1 className="title">Hello Next.js 👋</StyledHeading1>
    <StyledPaperItem>
      <p>test</p>
    </StyledPaperItem>
  </Layout>
);

export default IndexPage;
