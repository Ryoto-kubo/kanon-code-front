import { FirstViewButtons } from "@/components/molecules/FirstViewButtons";
import { FirstViewText } from "@/components/molecules/FirstViewText";
import React from "react";
import styled from "styled-components";
import PairProramingSvg from "../../assets/top/Pair-programming.svg";

const StyledPairProramingSvg = styled(PairProramingSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 450px;
  }
`;
const StyledUseMb = styled.div`
  margin-bottom: 24px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-bottom: 0px;
  }
`;

export const FirstView: React.FC = () => {
  return (
    <>
      <StyledUseMb>
        <FirstViewText />
        <FirstViewButtons />
      </StyledUseMb>
      <StyledPairProramingSvg />
    </>
  );
};
