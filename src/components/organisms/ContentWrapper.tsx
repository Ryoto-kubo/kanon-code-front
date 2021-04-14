import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};
const StyledContainer = styled("div")`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 24px;
`;

export const ContentWrapper: React.FC<Props> = (props) => {
  return <StyledContainer>{props.children}</StyledContainer>;
};
