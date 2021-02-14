import { Heading2 } from "@/components/atoms/Heading2";
import { FirstView } from "@/components/organisms/FirstView";
import Layout from "@/layouts/standard";
import { Box, Container } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
import PairProramingSvg from "../assets/top/Pair-programming.svg";
const StyledMaxWidthContainer = styled(Container)`
  max-width: 1200px;
  margin: auto;
`;
const IndexPage: React.FC = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <StyledMaxWidthContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        paddingY={7}
        mb={5}
      >
        <Box textAlign="center">
          <FirstView />
        </Box>
        <PairProramingSvg width={450} />
      </Box>
      <Heading2 fontSize={20}>フロント言語</Heading2>
    </StyledMaxWidthContainer>
  </Layout>
);
export default IndexPage;
