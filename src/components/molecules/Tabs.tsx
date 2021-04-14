import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import styled from "styled-components";

type Props = {
  value: string | number;
  onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
  tabLists: Array<{ label: string; value: string; href: string }>;
};
type LinkTabProps = {
  href: string;
  label?: string;
  value: string;
};

const StyledTabs = styled(Tabs)`
  // border-bottom: 1px solid #e8e8e8;
  margin-top: 16px;
`;
const StyledTab = styled(Tab)`
  min-width: 80px;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    color: #202020;
  }
`;

const LinkTab = (props: LinkTabProps) => {
  return (
    <StyledTab
      onClick={(event) => {
        event.preventDefault();
      }}
      disableRipple={true}
      {...props}
    />
  );
};

export const SettingTabs: React.FC<Props> = (props) => {
  const renderLists = () => {
    const renderLists = [];
    for (const element of props.tabLists) {
      renderLists.push(
        <LinkTab
          key={element.value}
          label={element.label}
          value={element.value}
          href={element.href}
        />
      );
    }
    return renderLists;
  };

  return (
    <>
      <StyledTabs
        value={props.value}
        onChange={props.onChange}
        variant="scrollable"
        indicatorColor="primary"
        textColor="primary"
      >
        {renderLists()}
      </StyledTabs>
      <Divider />
    </>
  );
};
