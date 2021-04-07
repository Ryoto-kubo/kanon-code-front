import { Heading2 } from "@/components/atoms/Heading2";
import { IconStar } from "@/components/atoms/IconStar";
import { Box } from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

type Props = {
  skils: { language: string; years_experince: string; value: number }[];
};

const StyledBoxSkilsArea = styled(Box)`
  background: #364549;
  padding: 10px;
  border-radius: 4px;
  height: auto;
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    min-width: 375px;
    height: 250px;
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;
const StyledBoxSkil = styled(Box)`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 300px;
  }
`;
const StyledBoxIconStar = styled(Box)`
  color: #fbbc05;
  display: inline-block;
`;
const StyledDivider = styled(Divider)`
  background: #ffffff;
`;
export const SkilsArea: React.FC<Props> = (props) => {
  const createInsertIconStars = (roopCount: number) => {
    const icons = [];
    for (let i = 0; i < roopCount; i++) {
      icons.push(
        <StyledBoxIconStar key={uuidv4()}>
          <IconStar fontSize="small" />
        </StyledBoxIconStar>
      );
    }
    return icons;
  };
  return (
    <>
      <Heading2 fontSize={20} marginBottom={1}>
        スキル一覧
      </Heading2>
      <StyledBoxSkilsArea>
        {props.skils.map((el) => (
          <StyledBoxSkil key={uuidv4()}>
            <p>
              {el.language} / {el.years_experince}
            </p>
            {createInsertIconStars(el.value)}
            <StyledDivider />
          </StyledBoxSkil>
        ))}
      </StyledBoxSkilsArea>
    </>
  );
};
