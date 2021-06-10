import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { ValidMessage } from "@/components/molecules/ValidMessage";
import { SettingForm } from "@/components/organisms/SettingForm";
import { messages } from "@/consts/messages";
import { SettingLayout } from "@/layouts/setting-form";
import { UserTypes } from "@/types/global";
import { postCredit } from "@/utils/api/post-credit";
import { getStripe } from "@/utils/stripe";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Snackbar from "@material-ui/core/Snackbar";
import { fade } from "@material-ui/core/styles";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import stripeJs from "@stripe/stripe-js";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledBox = styled(Box)(
  ({ theme }) => `
    width: 100%;
    margin: auto;
    margin-bottom: 32px;
    max-width: 600px;
    padding: 16px;
    background: ${fade(theme.palette.primary.main, 0.1)};
  `
);
const StyledBoxBgColorWhite = styled(Box)`
  background: #ffffff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Wrapper = ({
  authUser,
  currentUser,
}: {
  authUser: any;
  currentUser: UserTypes | null;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState("更新中...");
  const [isDisabled, setIsDidabled] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [userId] = useState(authUser.username);

  // useEffect(() => {
  //   const err = new Error();
  //   (async () => {
  //     try {
  //       const response = await getBank({ userId });
  //       const result = response.data;
  //       if (!result.status) throw (err.message = result.status_message);
  //       setBank(result.Item ? result.Item.bank : INITIAL_BANK);
  //       setDepositAlignment(result.Item ? result.Item.bank.deposit_type : null);
  //       setBankAlignment(result.Item ? result.Item.bank.bank_code : null);
  //       setIsLoading(false);
  //     } catch {
  //       console.error(err);
  //       alert(errorMessages.SYSTEM_ERROR);
  //     }
  //   })();
  // }, []);

  const changeNumber = (event: stripeJs.StripeCardElementChangeEvent) => {
    const empty = event.empty;
    const complete = event.complete;
    if (empty) {
      setIsDidabled(true);
      setIsValid(true);
      return;
    }
    if (complete) {
      setIsDidabled(false);
      setIsValid(true);
    } else {
      setIsDidabled(true);
      setIsValid(false);
    }
  };

  const update = async () => {
    if (!isValid) return;
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement!);
    if (error || !token) {
      setIsDidabled(true);
      setIsValid(false);
      return;
    }
    setIsOpen(true);
    const err = new Error();
    const responseToken = token.id;
    const cardId = token.card!.id;
    const last4Chara = token.card!.last4;
    const params = {
      userId,
      token: responseToken,
      cardId,
      last4Chara,
    };
    try {
      const response = await postCredit(params);
      const result = response.data;
      if (!result.status) throw (err.message = result.status_message);
      setUpdatingMessage(messages.UPDATED_MESSAGE);
    } catch {
      setIsOpen(true);
    }
  };

  return (
    <SettingLayout
      title="Kanon Code | カード情報設定"
      currentUser={currentUser}
    >
      <SettingForm
        linkText="クレジット"
        href="/settings/billing"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        <Box textAlign="center">
          <StyledBox>
            <StyledBoxBgColorWhite>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      backgroundColor: "#ffffff",
                    },
                    invalid: {
                      color: "#EA4335",
                    },
                  },
                }}
                onChange={changeNumber}
              />
            </StyledBoxBgColorWhite>
            {!isValid && <ValidMessage validText="入力された番号は無効です" />}
            <List disablePadding>
              <ListItem disableGutters dense>
                ・カード情報をStripeにのみ送信・保存されます
              </ListItem>
              <ListItem disableGutters dense>
                ・レビュワーのユーザー名を知ることができます
              </ListItem>
              <ListItem disableGutters dense>
                ・お支払いに関するQ＆A
              </ListItem>
            </List>
          </StyledBox>
          <CustomSolidButton
            sizing="small"
            onClick={update}
            disabled={isDisabled}
          >
            登録
          </CustomSolidButton>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={isOpen}
            message={updatingMessage}
          />
        </Box>
      </SettingForm>
    </SettingLayout>
  );
};

const IndexPage = (props: Props) => {
  const promiseStripe = getStripe();

  return (
    <Elements stripe={promiseStripe}>
      <Wrapper {...props} />
    </Elements>
  );
};

export default IndexPage;
