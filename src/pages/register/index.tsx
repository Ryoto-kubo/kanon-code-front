import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { TypoHeading1 } from "@/components/atoms/TypoHeading1";
import { CustomLoader } from "@/components/common/loader";
import { RegisteredDialog } from "@/components/parts/RegisteredDialog";
import { apis } from "@/consts/api/";
import { errorMessages } from "@/consts/error-messages";
import LayoutRegister from "@/layouts/register";
import theme from "@/styles/theme";
import { axios } from "@/utils/axios";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WelcomSvg from "../../assets/illustration/welcome.svg";
type Props = {
  title: string;
  authUser: any;
};

type ParamsType = {
  userId: string;
};

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;
const StyledWelcomSvg = styled(WelcomSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 80%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 450px;
  }
`;
const StyledBoxWrapper = styled(Box)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 70%;
    margin: auto;
  }
`;
const StyledBoxTextWrapper = styled(Box)`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 16px;
  }
`;
const StyledBoxInputWrapper = styled(Box)`
  margin-bottom: 24px;
`;
const StyledPUrlWrapper = styled("div")`
  margin: auto;
  margin-bottom: 32px;
  text-align: left;
  width: 100%;
  padding: 2px;
  border-bottom: 2px solid ${theme.palette.primary.main};
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 70%;
  }
`;

const getUser = async (params: ParamsType) => {
  return await axios.get(apis.GET_USER, { params });
};
const IndexPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDisabled, setIsDidabled] = useState<boolean>(true);
  const [name, setUserName] = useState<string>("");
  const domain = process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT;
  const payload = props.authUser.signInUserSession.idToken.payload;
  const userId = payload["cognito:username"];
  const params = {
    userId: userId,
  };

  const createParams = () => {
    return {
      userId: userId,
      displayName: name,
    };
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsDidabled(value === "");
    setUserName(value);
  };
  const openShowModal = async () => {
    const err = new Error();
    if (isDisabled) return;
    const params = createParams();
    try {
      const result = await axios.post(apis.UPDATE_DISPLAY_NAME, params);
      if (result.status !== 200) throw err;
      if (result.data.isSuccess) {
        setShowModal(true);
      } else [alert(errorMessages.EXISTED_NAME)];
    } catch (error) {
      console.error(error);
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const result = await getUser(params);
        if (result.status !== 200) throw err;
        const item = result.data.Item;
        const userProfile = item.user_profile;
        if (userProfile.display_name !== "") {
          router.push("/");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        alert(errorMessages.SYSTEM_ERROR);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <LayoutRegister
          title="Kanon Code | ユーザーネーム登録"
          authUser={props.authUser}
        >
          <StyledContainer maxWidth="sm">
            <Box mb={2}>
              <TypoHeading1 color="primary">
                Welcome!!
                <br />
                Kanon Code
              </TypoHeading1>
              <StyledWelcomSvg />
            </Box>
            <StyledBoxWrapper>
              <StyledBoxTextWrapper>
                サービス内で使用する名前を決めましょう
              </StyledBoxTextWrapper>
              <StyledBoxInputWrapper>
                <TextField
                  id="name"
                  type="text"
                  value={name}
                  fullWidth
                  label="name"
                  placeholder="user name"
                  onChange={changeName}
                  rows={0}
                />
              </StyledBoxInputWrapper>
            </StyledBoxWrapper>
            <StyledPUrlWrapper>
              <Typography>
                {domain}
                {name}
              </Typography>
            </StyledPUrlWrapper>
            {/* <StyledBoxWrapper>
              {isDisabled && (
                <ValidMessage validText="既に使用されている名前です。" />
              )}
            </StyledBoxWrapper> */}
            <CustomSolidButton
              sizing="small"
              onClick={openShowModal}
              disabled={isDisabled}
            >
              名前を決定する
            </CustomSolidButton>
          </StyledContainer>
          <RegisteredDialog showModal={showModal} name={name} />
        </LayoutRegister>
      )}
    </>
  );
};

export default IndexPage;
