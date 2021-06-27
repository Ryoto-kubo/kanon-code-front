import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  fontSize: number;
  marginBottom: number;
};

const StyledBoxTitleWrapper = styled(Box)`
  margin-bottom: 16px;
  padding-left: 8px;
  border-left: 5px solid ${theme.palette.primary.main};
`;

export const RightBorderTitle: React.FC<Props> = (props) => {
  return (
    <StyledBoxTitleWrapper>
      <CustomHeading2
        fontSize={props.fontSize}
        marginBottom={props.marginBottom}
      >
        {props.text}
      </CustomHeading2>
    </StyledBoxTitleWrapper>
  );
};
