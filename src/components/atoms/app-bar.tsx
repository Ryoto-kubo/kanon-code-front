import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React from "react";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  background: #ffffff;
  padding: 8px 0;
`;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { window, children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const CustomAppBar: React.FC<Props> = (props) => {
  return (
    <ElevationScroll {...props}>
      <StyledAppBar>{props.children}</StyledAppBar>
    </ElevationScroll>
  );
};
