import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { BaseTextField } from "@/components/atoms/TextField";
import { SettingForm } from "@/components/organisms/SettingForm";
// import * as CONSTS from "@/consts/const";
import { SettingLayout } from "@/layouts/setting-form";
import { UserType } from "@/types/global";
import Box from "@material-ui/core/Box";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserType | null;
};

const StyledButtonWrapper = styled(Box)`
  text-align: center;
`;

const StyledBoxTextFieldWrapper = styled(Box)`
  margin: auto;
  margin-bottom: 32px;
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 70%;
  }
`;

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  // const MAX_NAME_LENGTH = CONSTS.MAX_NAME_LENGTH;

  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
  };

  return (
    <SettingLayout
      title="Kanon Code | 名前設定"
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText="名前"
        href="/settings/profile"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        <StyledBoxTextFieldWrapper mb={4}>
          <BaseTextField
            id="name"
            type="text"
            value=""
            label="名前"
            placeholder="kanon code"
            rows={0}
            onChange={changeName}
          />
        </StyledBoxTextFieldWrapper>
        <StyledButtonWrapper>
          <CustomSolidButton sizing="small" onClick={update}>
            登録
          </CustomSolidButton>
        </StyledButtonWrapper>
      </SettingForm>
    </SettingLayout>
  );
};

export default IndexPage;
