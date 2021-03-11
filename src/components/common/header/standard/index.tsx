import { LinkWrapper } from "@/components/atoms/Link";
import { KanonCodeLogo } from "@/components/atoms/Logo";
import { SolidLink } from "@/components/atoms/SolidLink";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
import { SearchLink } from "@/components/molecules/SearchLink";
import { Box } from "@material-ui/core/";
import React from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 0 24px;
  }
`;
const StyledUseMr = styled.span`
  margin-right: 24px;
  display: inherit;
`;

export const TheStndardHeader: React.FC = () => {
  return (
    <CustomStickyAppBar>
      <StyledBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <LinkWrapper href="/">
          <KanonCodeLogo />
        </LinkWrapper>
        <Box display="flex" alignItems="center">
          <StyledUseMr>
            <SearchLink />
          </StyledUseMr>
          <SolidLink href="/signin">サインイン</SolidLink>
        </Box>
      </StyledBox>
    </CustomStickyAppBar>
  );
};
