import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { BaseTextField } from "@/components/atoms/TextField";
import { CustomLoader } from "@/components/common/loader";
import { ValidMessage } from "@/components/molecules/ValidMessage";
import { SettingForm } from "@/components/organisms/SettingForm";
import * as CONSTS from "@/consts/const";
import { errorMessages, validMessages } from "@/consts/error-messages";
import { SettingLayout } from "@/layouts/setting-form";
import theme from "@/styles/theme";
import { UserProfileProps, UserType } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import { postUserProfile } from "@/utils/api/post-user-profile";
import { UserProfile } from "@/utils/user-profile";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
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
const StyledPUrlWrapper = styled("div")`
  margin: auto;
  margin-bottom: 8px;
  text-align: left;
  width: 100%;
  padding: 2px;
  border-bottom: 2px solid ${theme.palette.primary.main};
`;

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  const [isLoading, setIsLoading] = useState(true);
  const [validText, setIsValidText] = useState<string>("");
  const [isDisabled, setIsDidabled] = useState<boolean>(true);
  const [userId] = useState(props.authUser.username);
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfileProps>({
    display_name: "",
    github_name: "",
    icon_src: "",
    introduction: "",
    position_type: 0,
    price: 0,
    skils: [],
    twitter_name: "",
    web_site: "",
  });
  const domain = process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT;
  const MAX_NAME_LENGTH = CONSTS.MAX_NAME_LENGTH;

  useEffect(() => {
    const err = new Error();
    (async () => {
      const params = {
        userId: userId,
      };
      try {
        const response = await getUser(params);
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        setProfile(result.Item.user_profile);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    })();
  }, []);

  const resetValid = () => {
    setIsValidName(true);
    setIsValidText("");
  };

  const updateProfile = async () => {
    const isValid = validName(profile.display_name);
    if (!isValid) return;
    const err = new Error();
    const params = {
      userId: userId,
      userProfile: profile,
    };
    try {
      const response = await postUserProfile(params);
      const result = response.data;
      console.log(result, "result");

      if (!result.status) {
        if (result.status_code === 1001) {
          alert(errorMessages.EXISTED_NAME);
          return;
        }
        throw err;
      }
    } catch (error) {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = validName(value);
    if (isValid) {
      setIsDidabled(false);
      resetValid();
    } else {
      if (value === "") resetValid();
      setIsDidabled(true);
    }
    setProfile({ ...profile, display_name: value });
  };

  const validName = (value: string): boolean => {
    const isValidMaxLength = UserProfile.validMaxLength(
      value.length,
      MAX_NAME_LENGTH
    );
    const isValidFirstAndLastChara = UserProfile.validFirstAndLastChara(value);
    const isValidSingleByte = UserProfile.validSingleByte(value);
    if (!isValidMaxLength) {
      setIsValidName(false);
      setIsValidText(`${MAX_NAME_LENGTH}文字以下で入力してください`);
      return isValidMaxLength;
    }
    if (!isValidFirstAndLastChara) {
      setIsValidName(false);
      setIsValidText(validMessages.NOT_UNDERSCORE_FOR_FIRST_LAST_CHARA);
      return isValidFirstAndLastChara;
    }
    if (!isValidSingleByte) {
      setIsValidName(false);
      setIsValidText(validMessages.ONLY_SINGLEBYTE_AND_UNDERSCORE);
      return isValidSingleByte;
    }
    return isValidMaxLength && isValidFirstAndLastChara && isValidSingleByte;
  };

  return (
    <SettingLayout
      title="Kanon Code | 名前設定"
      currentUser={props.currentUser}
    >
      {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <SettingForm
          linkText="名前"
          href="/settings/profile"
          fontSize="default"
          color="inherit"
          headingFontSize={24}
          marginBottom={0}
        >
          <StyledBoxTextFieldWrapper mb={4}>
            <Box mb={2}>
              <BaseTextField
                id="name"
                type="text"
                value={profile.display_name}
                label="名前"
                placeholder="kanon code"
                rows={0}
                onChange={changeName}
              />
            </Box>
            <StyledPUrlWrapper>
              <Typography>
                {domain}
                {profile.display_name}
              </Typography>
            </StyledPUrlWrapper>
            {!isValidName && <ValidMessage validText={validText} />}
          </StyledBoxTextFieldWrapper>
          <StyledButtonWrapper>
            <CustomSolidButton
              sizing="small"
              onClick={updateProfile}
              disabled={isDisabled}
            >
              登録
            </CustomSolidButton>
          </StyledButtonWrapper>
        </SettingForm>
      )}
    </SettingLayout>
  );
};

export default IndexPage;
