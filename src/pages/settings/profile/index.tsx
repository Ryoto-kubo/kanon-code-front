// import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { ContentHeader } from "@/components/molecules/ContentHeader";
import { FileExChange } from "@/components/molecules/FileExChange";
import { ProfileContentFile } from "@/components/molecules/ProfileContentFile";
import { ProfileContentLink } from "@/components/molecules/ProfileContentLink";
// import { SettingProfileFields } from "@/components/molecules/SettingProfileTextFields";
import { ContentWrapper } from "@/components/organisms/ContentWrapper";
import { IconArrowNext } from "@/components/svg/materialIcons/IconArrowNext";
// import { positions } from "@/consts/select-options";
// import { SettingLayout } from "@/layouts/setting";
// import Box from "@material-ui/core/Box";
// import MenuItem from "@material-ui/core/MenuItem";
// import { CognitoUser } from '@aws-amplify/auth'
import React, { useState } from "react";

// import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
};

// const StyledBoxFlex = styled(Box)`
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     display: flex;
//     justify-content: space-between;
//   }
// `;
// const StyledBoxCalcWidth = styled(Box)`
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     width: calc(100% - 150px);
//   }
// `;

export const getServerSideProps = async () => ({
  props: {
    layout: "SettingLayout",
    title: "プロフィール",
  },
});

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingParams, setSettingParams] = useState({
    name: "ryoto kubo",
    introduction: `フロントエンドエンジニアです。主にNuxtやNextを触っています。
    個人開発大好きエンジニアです。よろしくお願いします！`,
    amount: "",
    position: "",
    githubName: "",
    twitterName: "",
    webSite: "",
  });
  console.log(setSettingParams);

  const userInfo =
    props.authUser !== null
      ? props.authUser.signInUserSession.idToken.payload
      : "null";
  // const open = Boolean(anchorEl);
  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, name: e.target.value });
  // };
  // const changeIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, introduction: e.target.value });
  // };
  // const changePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, position: Number(e.target.value) });
  // };
  // const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, amount: Number(e.target.value) });
  // };
  // const changeGithubName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, githubName: e.target.value });
  // };
  // const changeTwitterName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, twitterName: e.target.value });
  // };
  // const changeWebSite = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettingParams({ ...settingParams, webSite: e.target.value });
  // };
  // const update = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   console.log(settingParams);
  // };

  // const renderOptions = (): JSX.Element[] => {
  //   return positions.map((option) => (
  //     <MenuItem key={option.value} value={option.value}>
  //       {option.label}
  //     </MenuItem>
  //   ));
  // };

  return (
    <section>
      <ContentWrapper>
        <ContentHeader
          title="プロフィール"
          description="Kanon Codeを利用する全てのユーザーに公開されます。"
          fontSize={20}
          marginBottom={1}
        />
        <ProfileContentFile
          label="アイコン"
          description="写真を追加することでアカウントをカスタマイズできます"
          isDivider={false}
          htmlFor="avatar"
        >
          <FileExChange htmlFor="avatar" picture={userInfo.picture} />
        </ProfileContentFile>
        <ProfileContentLink
          label="名前"
          value={settingParams.name}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>
        <ProfileContentLink
          label="紹介文"
          value={settingParams.introduction}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="ポジション"
          value={settingParams.position}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="100文字あたりの設定金額"
          value={settingParams.amount}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="Githubユーザーネーム"
          value={settingParams.githubName}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="Twitterユーザーネーム"
          value={settingParams.twitterName}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="webサイト"
          value={settingParams.webSite}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>
      </ContentWrapper>
      {/* <StyledBoxFlex>
        <FileExChange htmlFor="avatar" picture={userInfo.picture} />
        <StyledBoxCalcWidth mb={5}>
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
      </StyledBoxFlex> */}
    </section>
  );
};

export default IndexPage;
