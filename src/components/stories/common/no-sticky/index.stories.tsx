import { CustomAppBar } from "@/components/atoms/AppBar";
// import { KanonCodeLogo } from "@/components/atoms/Logo";
import { SolidLink } from "@/components/atoms/SolidLink";
import { Box } from "@material-ui/core/";
import Link from "next/link";
import React from "react";
// import styled from "styled-components";

// const StyledBox = styled(Box)`
//   padding: 0 16px;
//   max-width: 1280px;
//   width: 100%;
//   margin: auto;
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     padding: 0 24px;
//   }
// `;

export default {
  title: "TheNoStickyHeader",
};

export const ShowTheNoStickyHeader: React.FC = () => {
  return (
    <CustomAppBar>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link href="/">
          <a>{/* <KanonCodeLogo /> */}</a>
        </Link>
        <SolidLink href="/signin" borderRadius={4}>
          サインイン
        </SolidLink>
      </Box>
    </CustomAppBar>
  );
};
