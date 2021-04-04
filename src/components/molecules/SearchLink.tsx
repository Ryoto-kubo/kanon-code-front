import { LinkWrapper } from "@/components/atoms/Link";
import { Search } from "@material-ui/icons";
import React from "react";

export const SearchLink: React.FC = () => {
  return (
    <LinkWrapper href="/search">
      <Search color="action" />
    </LinkWrapper>
  );
};
