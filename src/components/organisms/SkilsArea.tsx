import { Heading2 } from "@/components/atoms/Heading2";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

type Props = {
  skils: { language: string; years_experince: string }[];
};

const StyledBoxSkils = styled(Box)`
  background: #364549;
  padding: 10px;
  border-radius: 4px;
  height: auto;
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    max-width: 500px;
    min-width: 375px;
    height: 190px;
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;
const StyledBoxLanguage = styled(Box)`
  color: #ffffff;
  font-size: 16px;
  width: 150px;
  padding: 5px;
`;
export const SkilsArea: React.FC<Props> = (props) => {
  return (
    <>
      <Heading2 fontSize={20} marginBottom={1}>
        スキル一覧
      </Heading2>
      <StyledBoxSkils>
        {props.skils.map((el) => (
          <StyledBoxLanguage key={uuidv4()}>
            <p>
              {el.language} / {el.years_experince}
            </p>
          </StyledBoxLanguage>
        ))}
      </StyledBoxSkils>
    </>
  );
};
