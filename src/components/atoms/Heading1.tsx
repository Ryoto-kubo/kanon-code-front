import theme from "@/styles/theme";
import React from "react";
import styled from "styled-components";

interface Props {
  fontSize: number;
  color?: string;
}

const StyledHeading1 = styled.h1<Pick<Props, "fontSize" | "color">>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${theme.palette.primary.main};
`;

export const Heading1: React.FC<Props> = (props) => {
  return (
    <StyledHeading1 fontSize={props.fontSize}>{props.children}</StyledHeading1>
  );
};

// import Typography from "@material-ui/core/Typography";
// import React from "react";
// import styled from "styled-components";

// interface Props {
//   fontSize: number;
// }

// export const Heading1: React.FC<Props> = (props) => {
//   const StyledHeading1 = styled(Typography)`
//     font-size: ${props.fontSize}px;
//   `;
//   return (
//     <StyledHeading1 variant="h1" color="primary">
//       {props.children}
//     </StyledHeading1>
//   );
// };
