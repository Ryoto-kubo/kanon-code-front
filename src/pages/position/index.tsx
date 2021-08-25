import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { ValidMessage } from '@/components/molecules/ValidMessage';
import { SettingForm } from '@/components/organisms/SettingForm';
import * as CONSTS from '@/consts/const';
import { errorMessages } from '@/consts/error-messages';
import { messages } from '@/consts/messages';
import { POSITIONS } from '@/consts/positions';
import { SettingLayout } from '@/layouts/setting-form';
import { UserTypes } from '@/types/global';
import { postUserProfile } from '@/utils/api/post-user-profile';
import { moveToTop } from '@/utils/move-page';
import { UserProfile } from '@/utils/user-profile';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes;
};

const StyledButtonWrapper = styled(Box)`
  text-align: center;
`;
const StyledBoxWrapper = styled(Box)`
  margin: auto;
  margin-bottom: 32px;
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 70%;
  }
`;
const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
  margin-left: 0px;
  margin-right: 0px;
  width: 240px;
  margin: auto;
`;

const IndexPage: React.FC<Props> = props => {
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState('更新中...');
  const [validText, setIsValidText] = useState<string>('');
  const [isDisabled, setIsDidabled] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [user, setUser] = useState<UserTypes>(props.currentUser);
  const ALLOW_POSITION_TYPE_LIST = CONSTS.ALLOW_POSITION_TYPE_LIST;
  const profile = props.currentUser.user_profile;

  const changePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    user.user_profile.position_type = Number(value);
    setUser({
      ...user!,
      user_profile: user.user_profile,
    });
  };

  const updateProfile = async () => {
    const isValid = validPositionType(profile.position_type);
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
        if (result.status_code === 1002) {
          alert(errorMessages.INVAILD_VALUE);
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

  const validPositionType = (value: number): boolean => {
    const isValid = UserProfile.validAllowNumber(
      value,
      ALLOW_POSITION_TYPE_LIST
    );
    if (!isValid) {
      setIsValid(false);
      setIsValidText(errorMessages.INVAILD_VALUE);
      return false;
    }
    return true;
  };

  return (
    <SettingLayout
      title='Kanon Code | ポジション設定'
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText='Position'
        href='/settings/profile'
        fontSize='default'
        color='inherit'
        headingFontSize={24}
        marginBottom={0}
      >
        <StyledBoxWrapper mb={4}>
          <Box mb={2}>
            <RadioGroup
              aria-label='position'
              name='position'
              value={profile.position_type}
              onChange={changePosition}
            >
              <Box>
                {POSITIONS.map(el => (
                  <StyledFormControlLabel
                    key={el.value}
                    value={el.value}
                    control={<Radio color='primary' />}
                    label={el.label}
                  />
                ))}
              </Box>
            </RadioGroup>
          </Box>
          {!isValid && <ValidMessage validText={validText} />}
        </StyledBoxWrapper>
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
