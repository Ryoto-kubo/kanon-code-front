import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { CustomLoader } from "@/components/common/loader";
import { ValidMessage } from "@/components/molecules/ValidMessage";
import { SettingForm } from "@/components/organisms/SettingForm";
import * as CONSTS from "@/consts/const";
import { errorMessages } from "@/consts/error-messages";
import { YEARS_EXPERIENCES } from "@/consts/years-experiences";
import { SettingLayout } from "@/layouts/setting-form";
import { UserProfileProps, UserType } from "@/types/global";
import { getUser } from "@/utils/api/get-user";
import { postUserProfile } from "@/utils/api/post-user-profile";
import { UserProfile } from "@/utils/user-profile";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
  currentUser: null | UserType;
};
type TypeParams = {
  language: string;
  yearsExperience: string;
  value: number;
}[];

const StyledBoxFieldWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const StyledTextFieldService = styled(TextField)`
  width: 47%;
`;
const StyledButtonWrapper = styled(Box)`
  text-align: center;
`;

const renderOptions = (): JSX.Element[] => {
  return YEARS_EXPERIENCES.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));
};

const IndexPage: React.FC<Props> = (props) => {
  const [skilParams] = useState<TypeParams>(CONSTS.INITIAL_SKILS);
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState("更新中...");
  const [isLoading, setIsLoading] = useState(true);
  const [validText, setIsValidText] = useState<string>("");
  const [isDisabled, setIsDidabled] = useState<boolean>(false);
  const [userId] = useState(props.authUser.username);
  const [profile, setProfile] = useState<UserProfileProps>(
    CONSTS.INITIAL_USER_PROFILE
  );
  const [validList, setValidList] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);
  const MAX_LANG_LENGTH = CONSTS.MAX_LANG_LENGTH;

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

  const update = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
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
          if (result.status_code === 1001) {
            alert(errorMessages.EXISTED_NAME);
            return;
          }
          throw err;
        }
        setUpdatingMessage("変更の反映には時間がかかることがあります。");
        setIsDidabled(false);
      } catch (error) {
        alert(errorMessages.SYSTEM_ERROR);
        setIsOpen(false);
        setIsDidabled(false);
      }
    },
    [profile]
  );

  const updateValidList = (index: number, isResult: boolean) => {
    const newValidList = validList.slice();
    newValidList[index] = isResult;
    setValidList(newValidList);
  };

  const changeLanguage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = event.target.value;
    const isValidMaxLength = UserProfile.validMaxLength(
      value.length,
      MAX_LANG_LENGTH
    );
    if (!isValidMaxLength) {
      updateValidList(index, false);
      setIsValidText(`${MAX_LANG_LENGTH}文字以下で入力してください`);
      setIsDidabled(true);
    } else {
      updateValidList(index, true);
      setIsDidabled(false);
    }
    setValue<string>(value, index, "language");
  };

  const changeYearsExperiences = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = Number(event.target.value);
    setValue<number>(value, index, "years_experiences");
  };

  const setValue = useCallback(
    <T extends {}>(value: T, index: number, key: string): void => {
      const currentItem = profile.skils[index];
      const newItem = {
        ...currentItem,
        [key]: value,
      };
      const newSkils = profile.skils.slice();
      newSkils[index] = newItem;
      setProfile({ ...profile, skils: newSkils });
    },
    [profile]
  );

  const renderTextFields = useCallback(() => {
    return skilParams.map((elemet, index) => (
      <Box key={index} mb={3}>
        <StyledBoxFieldWrapper>
          <StyledTextFieldService
            type="text"
            style={{ display: "block" }}
            value={profile.skils[index]?.language}
            placeholder="例：php"
            label="プログラミング言語"
            fullWidth={true}
            variant="outlined"
            onChange={(event) => changeLanguage(event, index)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <StyledTextFieldService
            select
            style={{ display: "block" }}
            defaultValue={elemet.value}
            value={profile.skils[index]?.years_experiences}
            label="経験年数"
            fullWidth={true}
            variant="outlined"
            onChange={(event) => changeYearsExperiences(event, index)}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {renderOptions()}
          </StyledTextFieldService>
        </StyledBoxFieldWrapper>
        {!validList[index] && <ValidMessage validText={validText} />}
      </Box>
    ));
  }, [profile, validList]);

  return (
    <SettingLayout
      title="Kanon Code | スキル設定"
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText="Skil"
        href="/settings/skil"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        {isLoading ? (
          <CustomLoader width={40} height={40} />
        ) : (
          <>
            {renderTextFields()}
            <StyledButtonWrapper>
              <CustomSolidButton
                sizing="small"
                onClick={update}
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
