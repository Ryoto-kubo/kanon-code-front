import theme from "@/styles/theme";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import styled from "styled-components";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

// function ElevationScroll(props: Props) {
//   const { window, children } = props
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   })
//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   })
// }

const StyledAppBar = styled(AppBar)`
  background-color: ${theme.palette.primary.contrastText};
  padding: 8px 0;
  box-shadow: none;
`;

export const StandardAppBar: React.FC<Props> = (props) => {
  return (
    // <ElevationScroll {...props}>
    <StyledAppBar position="static">{props.children}</StyledAppBar>
    // </ElevationScroll>
  );
};
