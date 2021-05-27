import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { SettingForm } from "@/components/organisms/SettingForm";
import { yearsExperiences } from "@/consts/select-options";
import { SettingLayout } from "@/layouts/setting-form";
import { UserType } from "@/types/global";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  currentUser: null | UserType;
};
type TypeParams = {
  language: string;
  yearsExperience: string;
  value: number;
}[];

const StyledTextFieldService = styled(TextField)`
  margin-bottom: 32px;
  width: 47%;
`;
const StyledButtonWrapper = styled(Box)`
  text-align: center;
`;

const IndexPage: React.FC<Props> = (props) => {
  const [skilParams, setSkilParams] = useState<TypeParams>([
    {
      language: "",
      yearsExperience: "1年~2年",
      value: 1,
    },
    {
      language: "",
      yearsExperience: "1年~2年",
      value: 1,
    },
    {
      language: "",
      yearsExperience: "1年~2年",
      value: 1,
    },
    {
      language: "",
      yearsExperience: "1年~2年",
      value: 1,
    },
    {
      language: "",
      yearsExperience: "1年~2年",
      value: 1,
    },
  ]);
  console.log(setSkilParams);

  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(...skilParams);
  };
  const renderOptions = (): JSX.Element[] => {
    return yearsExperiences.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };
  const renderTextFields = () => {
    return skilParams.map((elemet, index) => (
      <Box display="flex" justifyContent="space-between" key={index}>
        <StyledTextFieldService
          type="text"
          style={{ display: "block" }}
          defaultValue={elemet.language}
          placeholder="例：php"
          label="プログラミング言語"
          fullWidth={true}
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            elemet.language = e.target.value;
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <StyledTextFieldService
          select
          type="text"
          style={{ display: "block" }}
          defaultValue={elemet.value}
          label="経験年数"
          fullWidth={true}
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);
            const yearsExperience = yearsExperiences[value - 1].label;
            elemet.value = value;
            elemet.yearsExperience = yearsExperience;
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {renderOptions()}
        </StyledTextFieldService>
      </Box>
    ));
  };

  return (
    <SettingLayout
      title="Kanon Code | スキル設定"
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText="スキル"
        href="/settings/skil"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        {renderTextFields()}
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
