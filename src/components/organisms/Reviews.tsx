import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import styled from "styled-components";

type MypageData = {
  contents: {
    display_name: string;
    position: string;
    skils: {
      language: string;
      years_experince: string;
      value: number;
    }[];
    github_name: string;
    twitter_name: string;
    web_site: string;
  };
  cognitoId: string;
};

type Props = {
  user: any;
  mypageData: MypageData;
  isMe: boolean;
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #e8e8e8;
  margin-top: 16px;
`;
const StyledTab = styled(Tab)`
  min-width: 100px;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    color: #202020;
  }
`;

export const Reviews: React.FC<Props> = (props) => {
  console.log(props);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <>
      <Box mb={3}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
        >
          <StyledTab label="レビュー依頼中" disableRipple={true} />
          <StyledTab label="レビューをした投稿" disableRipple={true} />
          {props.isMe && (
            <StyledTab label="開封したレビュー" disableRipple={true} />
          )}
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        レビュー依頼中
      </TabPanel>
      <TabPanel value={value} index={1}>
        レビューをした投稿
      </TabPanel>
      {props.isMe && (
        <TabPanel value={value} index={2}>
          開封したレビュー
        </TabPanel>
      )}
    </>
  );
};
