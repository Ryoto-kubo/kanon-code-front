import Layout from "@/layouts/standard";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import PairProramingSvg from "../assets/top/Pair-programming.svg";
const StyledPaperItem = styled(Paper)`
  margin: 0 0 1.25rem;
  height: 1500px;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const IndexPage = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <PairProramingSvg />
    <StyledPaperItem></StyledPaperItem>
  </Layout>
);

export default IndexPage;
