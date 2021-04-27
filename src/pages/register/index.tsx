import { TypoHeading1 } from "@/components/atoms/TypoHeading1";
import LayoutRegister from "@/layouts/register";
import { Container } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
import WelcomSvg from "../../assets/illustration/welcome.svg";

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  margin-top: 70px;
`;
const StyledWelcomSvg = styled(WelcomSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 450px;
  }
`;

const IndexPage: React.FC = () => (
  <LayoutRegister title="Kanon Code | ユーザーネーム登録">
    <StyledContainer>
      <TypoHeading1 color="textPrimary">Welcome!!</TypoHeading1>
      <StyledWelcomSvg />
    </StyledContainer>
  </LayoutRegister>
);
export default IndexPage;
