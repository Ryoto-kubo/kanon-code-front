import { CustomIconButton } from "@/components/atoms/IconButton";
import { SearchField } from "@/components/molecules/SearchField";
import Layout from "@/layouts/standard";
import { CognitoUser } from "@aws-amplify/auth";
import { Container, Grid, Grow, Paper } from "@material-ui/core/";
import { fade } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import CakePhpSvg from "../../assets/logo/cakephp.svg";
import JavaScriptSvg from "../../assets/logo/javascript.svg";
import LaravelSvg from "../../assets/logo/laravel.svg";
import NextSvg from "../../assets/logo/next.svg";
import NuxtSvg from "../../assets/logo/nuxt.svg";
import PhpSvg from "../../assets/logo/php.svg";
import ReactSvg from "../../assets/logo/react.svg";
import VueSvg from "../../assets/logo/vue.svg";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const formFunc = (e: React.FormEvent) => {
  console.log("enterを押した検索");
  e.preventDefault();
};
const func = () => {
  console.log("iconを押した検索");
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  &:hover {
    box-shadow: 0 3px 6px #707070;
  }
`;
const StyledCircle = styled.div`
  border-radius: 50px;
  background: ${fade("#f5f5f5", 0.7)};
  width: 80px;
  height: 80px;
  display: inline-block;
  position: relative;
  transition: all 0.3s;
`;
const StyledAbsolute = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledGridCenter = styled(Grid)`
  text-align: center;
`;

const IndexPage: React.FC<Props> = (props) => (
  <Layout title="Kanon Code | 検索" authUser={props.authUser}>
    <Container maxWidth="md">
      <SearchField formFunc={formFunc} func={func} />
      <Grow in={true}>
        <Grid container spacing={3}>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <JavaScriptSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>JavaScript</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <VueSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>Vue.js</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <ReactSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>React.js</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <NuxtSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>Nuxt.js</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <NextSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>Next.js</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <PhpSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>php</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <CakePhpSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>Cakephp</p>
            </StyledPaper>
          </StyledGridCenter>
          <StyledGridCenter item xs={6} sm={3} md={2}>
            <StyledPaper elevation={0}>
              <StyledCircle>
                <StyledAbsolute>
                  <CustomIconButton disableRipple={true} func={func}>
                    <LaravelSvg width={40} height={40} />
                  </CustomIconButton>
                </StyledAbsolute>
              </StyledCircle>
              <p>Laravel</p>
            </StyledPaper>
          </StyledGridCenter>
        </Grid>
      </Grow>
    </Container>
  </Layout>
);
export default IndexPage;
