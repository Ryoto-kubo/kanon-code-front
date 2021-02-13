import { Heading1 } from "@/components/atoms/heading1";
import { CustomSolidButton } from "@/components/atoms/solid-button";
import { CoustomTypography } from "@/components/atoms/typography";
import { CustomWhiteOutButton } from "@/components/atoms/white-out-button";
import Layout from "@/layouts/standard";
import { Box, Container } from "@material-ui/core/";
import styled from "styled-components";
import PairProramingSvg from "../assets/top/Pair-programming.svg";
const StyledContainer = styled(Container)`
  background: #ffffff;
`;
const StyledMaxWidthContainer = styled(Container)`
  max-width: 1000px;
  margin: auto;
`;

const IndexPage = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <StyledContainer>
      <StyledMaxWidthContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          paddingY={7}
        >
          <Box textAlign="center">
            <CoustomTypography fontSize={16} fontWeight="bold">
              今より一歩前に。
            </CoustomTypography>
            <Box mb={0.5}>
              <Heading1 fontSize={48}>Kanon Code</Heading1>
            </Box>
            <Box mb={1.5}>
              <CoustomTypography
                fontSize={18}
                fontWeight="bold"
                isPrimary={true}
              >
                コードレビューをもらえる、おくれる。
              </CoustomTypography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <CustomSolidButton sizing="small">サインイン</CustomSolidButton>
              <CustomWhiteOutButton sizing="small">
                KanonCodeとは
              </CustomWhiteOutButton>
            </Box>
          </Box>
          <PairProramingSvg width={450} />
        </Box>
      </StyledMaxWidthContainer>
    </StyledContainer>
  </Layout>
);

export default IndexPage;
