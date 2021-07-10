import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { BaseTextField } from "@/components/atoms/TextField";
// import { ValidMessage } from "@/components/molecules/ValidMessage";
import { SettingForm } from "@/components/organisms/SettingForm";
import * as CONSTS from "@/consts/const";
import { errorMessages } from "@/consts/error-messages";
import { messages } from "@/consts/messages";
import { SettingLayout } from "@/layouts/setting-form";
// import theme from "@/styles/theme";
import { UserTypes } from "@/types/global";
import { postUserProfile } from "@/utils/api/post-user-profile";
import { UserProfile } from "@/utils/user-profile";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  authUser: any;
  currentUser: UserTypes;
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
  const MAX_PRICE_LENGTH = CONSTS.MAX_PRICE_LENGTH;
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState("更新中...");
  const [isDisabled, setIsDidabled] = useState<boolean>(false);
  const [user, setUser] = useState<UserTypes>(props.currentUser);
  const profile = props.currentUser.user_profile;

  const updateProfile = async () => {
    const isValid = validPrice(String(profile.price));
    if (!isValid) return;
    setIsOpen(true);
    setIsDidabled(true);
    const err = new Error();
    const params = {
      userProfile: profile,
    };
    try {
      const response = await postUserProfile(params);
      const result = response.data;
      if (!result.status) {
        if (result.status_code === 1001) {
          alert(errorMessages.EXISTED_NAME);
          return;
        }
        throw err;
      }
      setUpdatingMessage(messages.UPDATED_MESSAGE);
      setIsDidabled(false);
    } catch (error) {
      alert(errorMessages.SYSTEM_ERROR);
      setIsOpen(false);
      setIsDidabled(false);
    }
  };

  const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      user.user_profile.price = 0;
      setUser({
        ...user!,
        user_profile: user.user_profile,
      });
      return;
    }
    const isValid = validPrice(value);
    if (isValid) {
      user.user_profile.price = Number(value);
      setUser({
        ...user!,
        user_profile: user.user_profile,
      });
    }
  };

  const validPrice = (value: string) => {
    const isVaildMaxLength = UserProfile.validMaxLength(
      value.length,
      MAX_PRICE_LENGTH
    );
    if (!isVaildMaxLength) {
      return false;
    }
    const isValid = UserProfile.validOnlytSingleByteNumber(value);
    return isVaildMaxLength && isValid;
  };

  return (
    <SettingLayout
      title="Kanon Code | 金額設定"
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText="Price"
        href="/settings/profile"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
            <StyledBoxTextFieldWrapper mb={4}>
              <Box mb={2}>
                <BaseTextField
                  id="price"
                  type="text"
                  value={profile.price}
                  label="100文字あたりの設定金額（円）"
                  placeholder="100"
                  rows={0}
                  onChange={changePrice}
                />
              </Box>
              {/* {!isValid && <ValidMessage validText={validText} />} */}
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
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={isOpen}
              message={updatingMessage}
            />
      </SettingForm>
    </SettingLayout>
  );
};

export default IndexPage;
