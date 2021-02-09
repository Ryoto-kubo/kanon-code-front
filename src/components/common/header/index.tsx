import styled from "styled-components";

const StyledHeader = styled.header`
  font-size: 1.2rem;
  background: red;
`;

export const TheHeader = () => (
  <StyledHeader>
    <p>logoが入る</p>
  </StyledHeader>
);
