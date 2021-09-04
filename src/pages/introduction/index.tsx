import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { BaseTextField } from '@/components/atoms/TextField';
import { ValidMessage } from '@/components/molecules/ValidMessage';
import { SettingForm } from '@/components/organisms/SettingForm';
import * as CONSTS from '@/consts/const';
import { errorMessages } from '@/consts/error-messages';
import { messages } from '@/consts/messages';
import { SettingLayout } from '@/layouts/setting-form';
import { UserTypes } from '@/types/global';
import { postUserProfile } from '@/utils/api/post-user-profile';
import { moveToTop } from '@/utils/move-page';
import { UserProfile } from '@/utils/user-profile';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes;
};

const StyledButtonWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 40px;
`;
const StyledBoxTextFieldWrapper = styled(Box)`
  margin: auto;
  margin-bottom: 32px;
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 70%;
  }
`;

const IndexPage: React.FC<Props> = props => {
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState('更新中...');
  const [validText, setIsValidText] = useState<string>('');
  const [isDisabled, setIsDidabled] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [user, setUser] = useState<UserTypes>(props.currentUser);
  const MAX_INTRODUCTION_LENGTH = CONSTS.MAX_INTRODUCTION_LENGTH;
  const profile = props.currentUser.user_profile;

  const resetValid = () => {
    setIsValid(true);
    setIsValidText('');
  };

  const updateProfile = async () => {
    const isValid = validIntroduction(profile.introduction);
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

  const changeIntroduction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = validIntroduction(value);
    if (isValid) {
      setIsDidabled(false);
      resetValid();
    } else {
      if (value === '') resetValid();
      setIsDidabled(true);
    }
    user.user_profile.introduction = value;
    setUser({
      ...user!,
      user_profile: user.user_profile,
    });
  };

  const validIntroduction = (value: string): boolean => {
    const isValidMaxLength = UserProfile.validMaxLength(
      value.length,
      MAX_INTRODUCTION_LENGTH
    );
    if (!isValidMaxLength) {
      setIsValid(false);
      setIsValidText(`${MAX_INTRODUCTION_LENGTH}文字以下で入力してください`);
      return false;
    }
    return true;
  };

  return (
    <SettingLayout
      title='Kanon Code | 自己紹介設定'
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText='Introduction'
        href='/settings/profile'
        fontSize='default'
        color='inherit'
        headingFontSize={24}
        marginBottom={0}
      >
        <StyledBoxTextFieldWrapper mb={4}>
          <Box mb={2}>
            <BaseTextField
              id='introduction'
              type='text'
              value={profile.introduction}
              label='自己紹介'
              placeholder='よろしくお願いします。'
              multiline
              rows={4}
              onChange={changeIntroduction}
            />
          </Box>
          {!isValid && <ValidMessage validText={validText} />}
        </StyledBoxTextFieldWrapper>
        <StyledButtonWrapper>
          <CustomSolidButton
            sizing='small'
            onClick={updateProfile}
            disabled={isDisabled}
          >
            登録
          </CustomSolidButton>
        </StyledButtonWrapper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isOpen}
          message={updatingMessage}
        />
      </SettingForm>
    </SettingLayout>
  );
};

export default IndexPage;
