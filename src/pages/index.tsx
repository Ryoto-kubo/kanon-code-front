import Layout from "@/layouts";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
const StyledPaperItem = styled(Paper)`
  margin: 0 0 1.25rem;
  height: 1500px;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const IndexPage = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <StyledPaperItem>
      <p>test</p>
    </StyledPaperItem>
  </Layout>
);

export default IndexPage;
