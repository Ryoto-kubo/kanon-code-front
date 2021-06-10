import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { CustomLoader } from "@/components/common/loader";
import { ValidMessage } from "@/components/molecules/ValidMessage";
import { SettingForm } from "@/components/organisms/SettingForm";
import * as CONSTS from "@/consts/const";
import { errorMessages } from "@/consts/error-messages";
import { messages } from '@/consts/messages';
import { POSITIONS } from "@/consts/positions";
import { SettingLayout } from "@/layouts/setting-form";
// import theme from "@/styles/theme";
import { UserProfileTypes, UserTypes } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import { postUserProfile } from "@/utils/api/post-user-profile";
import { UserProfile } from "@/utils/user-profile";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Snackbar from "@material-ui/core/Snackbar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledButtonWrapper = styled(Box)`
  text-align: center;
`;
const StyledBoxWrapper = styled(Box)`
  margin: auto;
  margin-bottom: 32px;
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
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

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState("更新中...");
  const [isLoading, setIsLoading] = useState(true);
  const [validText, setIsValidText] = useState<string>("");
  const [isDisabled, setIsDidabled] = useState<boolean>(false);
  const [userId] = useState(props.authUser.username);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfileTypes>({
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
  const ALLOW_POSITION_TYPE_LIST = CONSTS.ALLOW_POSITION_TYPE_LIST;

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

  const changePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProfile({ ...profile, position_type: Number(value) });
  };

  const updateProfile = async () => {
    const isValid = validPositionType(profile.position_type);
    if (!isValid) return;
    setIsOpen(true);
    setIsDidabled(true);
    const err = new Error();
    const params = {
      userId: userId,
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

      // setIsOpen(false)
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
      title="Kanon Code | ポジション設定"
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText="Position"
        href="/settings/profile"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        {isLoading ? (
          <CustomLoader width={40} height={40} />
        ) : (
          <>
            <StyledBoxWrapper mb={4}>
              <Box mb={2}>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={profile.position_type}
                  onChange={changePosition}
                >
                  <Box>
                    {POSITIONS.map((el) => (
                      <StyledFormControlLabel
                        key={el.value}
                        value={el.value}
                        control={<Radio color="primary" />}
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
          </>
        )}
      </SettingForm>
    </SettingLayout>
  );
};

export default IndexPage;
