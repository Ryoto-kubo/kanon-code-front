import { IconArrowNext } from "@/components/atoms/IconArrowNext";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  value: string;
  isDivider: boolean;
};
const StyledBox = styled(Box)`
  margin-bottom: 24px;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
`;
const StyledBoxWrapperLabel = styled(Box)`
  color: #5f6368;
  font-size: 12px;
  flex-basis: 156px;
  margin-right: 24px;
`;
const StyledBoxWrapperValue = styled(Box)`
  font-size: 16px;
  flex-basis: 328px;
  margin-right: 24px;
`;
// const StyledDivider = styled(Divider)`
//   padding-left: 24px;
// `;
const StyledBorderWeapper = styled("div")`
  padding-left: 24px;
`;
const StyledBorder = styled("div")`
  border-bottom: 1px solid #e8e8e8;
`;

export const ProfileContent: React.FC<Props> = (props) => {
  return (
    <StyledBox>
      <a>
        <StyledBoxFlex>
          <StyledBoxWrapperLabel>{props.label}</StyledBoxWrapperLabel>
          <StyledBoxWrapperValue>{props.value}</StyledBoxWrapperValue>
          <IconArrowNext fontSize="large" color="action" />
        </StyledBoxFlex>
        {/* <StyledDivider /> */}
      </a>
      <StyledBorderWeapper>
        <Divider />
      </StyledBorderWeapper>
    </StyledBox>
  );
};
