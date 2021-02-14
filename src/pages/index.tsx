import { Heading2 } from "@/components/atoms/Heading2";
import { FirstView } from "@/components/organisms/FirstView";
import Layout from "@/layouts/standard";
import theme from "@/styles/theme";
import { faTags, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
import ReactSvg from "../assets/logo/react.svg";
import PairProramingSvg from "../assets/top/Pair-programming.svg";

const StyledMaxWidthContainer = styled(Container)`
  max-width: 1200px;
  margin: auto;
`;
const StyledMaxWidthdiv = styled.div`
  max-width: 310px;
  margin: auto;
`;
const IndexPage: React.FC = () => (
  <Layout title="KanonCode | コードレビュを全てのエンジニアへ">
    <StyledMaxWidthContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        pt={7}
        pb={5}
        mb={5}
      >
        <Box textAlign="center">
          <FirstView />
        </Box>
        <PairProramingSvg width={450} />
      </Box>
      <Box mb={4}>
        <Heading2 fontSize={20}>フロント言語</Heading2>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={8}
      >
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Box mr={1}>
            <ReactSvg width={50} />
          </Box>
          <StyledMaxWidthdiv>
            <Box mb={1}>
              <Heading2 fontSize={16}>
                reactのatomic designのレビューをお願いします。
              </Heading2>
            </Box>
            <Box mb={1}>
              <Box mr={1} component="span">
                <FontAwesomeIcon icon={faTags} color="#707070" />
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#react</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#atomic design</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#デザインパターン</span>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width={50}
                height={50}
                borderRadius={100}
                border="3px solid #707070"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={1}
              >
                <Box>
                  <FontAwesomeIcon icon={faUser} size="2x" color="#707070" />
                </Box>
              </Box>
              <Box>
                <p>porokyu</p>
                <p>あと3日</p>
              </Box>
            </Box>
          </StyledMaxWidthdiv>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Box mr={1}>
            <ReactSvg width={50} />
          </Box>
          <StyledMaxWidthdiv>
            <Box mb={1}>
              <Heading2 fontSize={16}>
                reactのatomic designのレビューをお願いします。
              </Heading2>
            </Box>
            <Box mb={1}>
              <Box mr={1} component="span">
                <FontAwesomeIcon icon={faTags} color="#707070" />
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#react</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#atomic design</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#デザインパターン</span>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width={50}
                height={50}
                borderRadius={100}
                border="3px solid #707070"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={1}
              >
                <Box>
                  <FontAwesomeIcon icon={faUser} size="2x" color="#707070" />
                </Box>
              </Box>
              <Box>
                <p>porokyu</p>
                <p>あと3日</p>
              </Box>
            </Box>
          </StyledMaxWidthdiv>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Box mr={1}>
            <ReactSvg width={50} />
          </Box>
          <StyledMaxWidthdiv>
            <Box mb={1}>
              <Heading2 fontSize={16}>
                reactのatomic designのレビューをお願いします。
              </Heading2>
            </Box>
            <Box mb={1}>
              <Box mr={1} component="span">
                <FontAwesomeIcon icon={faTags} color="#707070" />
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#react</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#atomic design</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#デザインパターン</span>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width={50}
                height={50}
                borderRadius={100}
                border="3px solid #707070"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={1}
              >
                <Box>
                  <FontAwesomeIcon icon={faUser} size="2x" color="#707070" />
                </Box>
              </Box>
              <Box>
                <p>porokyu</p>
                <p>あと3日</p>
              </Box>
            </Box>
          </StyledMaxWidthdiv>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={8}
      >
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Box mr={1}>
            <ReactSvg width={50} />
          </Box>
          <StyledMaxWidthdiv>
            <Box mb={1}>
              <Heading2 fontSize={16}>
                reactのatomic designのレビューをお願いします。
              </Heading2>
            </Box>
            <Box mb={1}>
              <Box mr={1} component="span">
                <FontAwesomeIcon icon={faTags} color="#707070" />
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#react</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#atomic design</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#デザインパターン</span>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width={50}
                height={50}
                borderRadius={100}
                border="3px solid #707070"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={1}
              >
                <Box>
                  <FontAwesomeIcon icon={faUser} size="2x" color="#707070" />
                </Box>
              </Box>
              <Box>
                <p>porokyu</p>
                <p>あと3日</p>
              </Box>
            </Box>
          </StyledMaxWidthdiv>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Box mr={1}>
            <ReactSvg width={50} />
          </Box>
          <StyledMaxWidthdiv>
            <Box mb={1}>
              <Heading2 fontSize={16}>
                reactのatomic designのレビューをお願いします。
              </Heading2>
            </Box>
            <Box mb={1}>
              <Box mr={1} component="span">
                <FontAwesomeIcon icon={faTags} color="#707070" />
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#react</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#atomic design</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#デザインパターン</span>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width={50}
                height={50}
                borderRadius={100}
                border="3px solid #707070"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={1}
              >
                <Box>
                  <FontAwesomeIcon icon={faUser} size="2x" color="#707070" />
                </Box>
              </Box>
              <Box>
                <p>porokyu</p>
                <p>あと3日</p>
              </Box>
            </Box>
          </StyledMaxWidthdiv>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Box mr={1}>
            <ReactSvg width={50} />
          </Box>
          <StyledMaxWidthdiv>
            <Box mb={1}>
              <Heading2 fontSize={16}>
                reactのatomic designのレビューをお願いします。
              </Heading2>
            </Box>
            <Box mb={1}>
              <Box mr={1} component="span">
                <FontAwesomeIcon icon={faTags} color="#707070" />
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#react</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#atomic design</span>
              </Box>
              <Box color={theme.palette.primary.main} mr={1} component="span">
                <span>#デザインパターン</span>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box
                width={50}
                height={50}
                borderRadius={100}
                border="3px solid #707070"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={1}
              >
                <Box>
                  <FontAwesomeIcon icon={faUser} size="2x" color="#707070" />
                </Box>
              </Box>
              <Box>
                <p>porokyu</p>
                <p>あと3日</p>
              </Box>
            </Box>
          </StyledMaxWidthdiv>
        </Box>
      </Box>
    </StyledMaxWidthContainer>
  </Layout>
);
export default IndexPage;
