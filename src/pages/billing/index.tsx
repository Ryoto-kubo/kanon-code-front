import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { SettingForm } from "@/components/organisms/SettingForm";
import { SettingLayout } from "@/layouts/setting-form";
import { UserTypes } from "@/types/global";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { fade } from "@material-ui/core/styles";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  currentUser: null | UserTypes;
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
  margin-bottom: 16px;
`;

const IndexPage: React.FC<Props> = (props) => {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
  const stripe = loadStripe(stripeKey);
  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <SettingLayout
      title="Kanon Code | カード情報設定"
      currentUser={props.currentUser}
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
          {/* <StyledBoxBgPrimary> */}
          <StyledBox>
            <StyledBoxBgColorWhite>
              <Elements stripe={stripe}>
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
                />
              </Elements>
            </StyledBoxBgColorWhite>
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
          {/* </StyledBoxBgPrimary> */}

          <CustomSolidButton sizing="small" onClick={update}>
            登録
          </CustomSolidButton>
        </Box>
      </SettingForm>
    </SettingLayout>
  );
};

export default IndexPage;
