import { Heading3 } from "@/components/atoms/Heading3";
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { SettingLayout } from "@/layouts/setting";
import theme from "@/styles/theme";
import { CognitoUser } from "@aws-amplify/auth";
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
  authUser: CognitoUser;
};

const StyledBox = styled(Box)`
  width: 100%;
  margin: auto;
  margin-bottom: 32px;
  max-width: 600px;
  padding: 16px;
  background: ${fade(theme.palette.primary.main, 0.1)};
`;
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
  };

  return (
    <SettingLayout title="Kanon Code | カード情報" authUser={props.authUser}>
      <Box textAlign="center" mb={5}>
        <Box mb={1}>
          <Heading3 fontSize={18} marginBottom={0}>
            支払いカードの登録
          </Heading3>
        </Box>
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
        <Box textAlign="center">
          <CustomSolidButton sizing="medium" onClick={update}>
            登録する
          </CustomSolidButton>
        </Box>
      </Box>
    </SettingLayout>
  );
};

export default IndexPage;
