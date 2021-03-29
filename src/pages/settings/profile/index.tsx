import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { FileExChange } from "@/components/molecules/FileExChange";
import { SettingProfileFields } from "@/components/molecules/SettingProfileTextFields";
import { positions } from "@/consts/select-options";
import { SettingLayout } from "@/layouts/setting";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
// import { CognitoUser } from '@aws-amplify/auth'
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
};

const StyledBoxFlex = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxCalcWidth = styled(Box)`
  margin-bottom: 40px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: calc(100% - 150px);
  }
`;

const IndexPage: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingParams, setSettingParams] = useState({
    name: "",
    introduction: "",
    amount: 0,
    position: 0,
    githubName: "",
    twitterName: "",
    webSite: "",
  });
  const userInfo =
    props.authUser !== null
      ? props.authUser.signInUserSession.idToken.payload
      : "null";
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, name: e.target.value });
  };
  const changeIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, introduction: e.target.value });
  };
  const changePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, position: Number(e.target.value) });
  };
  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, amount: Number(e.target.value) });
  };
  const changeGithubName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, githubName: e.target.value });
  };
  const changeTwitterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, twitterName: e.target.value });
  };
  const changeWebSite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingParams({ ...settingParams, webSite: e.target.value });
  };
  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(settingParams);
  };

  const renderOptions = (): JSX.Element[] => {
    return positions.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <SettingLayout
      title="Kanon Code | プロフィール設定"
      authUser={props.authUser}
    >
      <section>
        <StyledBoxFlex>
          <FileExChange htmlFor="avatar" picture={userInfo.picture} />
          <StyledBoxCalcWidth>
            <SettingProfileFields
              settingParams={settingParams}
              renderOptions={renderOptions()}
              onChangeName={changeName}
              onChangeIntroduction={changeIntroduction}
              onChangePosition={changePosition}
              onChangeAmount={changeAmount}
              onChangeGithubName={changeGithubName}
              onChangeTwitterName={changeTwitterName}
              onChangeWebSite={changeWebSite}
              handleMenu={handleMenu}
              handleClose={handleClose}
              anchorEl={anchorEl}
              open={open}
            />
            <Box textAlign="center">
              <CustomSolidButton sizing="medium" onClick={update}>
                更新する
              </CustomSolidButton>
            </Box>
          </StyledBoxCalcWidth>
        </StyledBoxFlex>
      </section>
    </SettingLayout>
  );
};

export default IndexPage;
