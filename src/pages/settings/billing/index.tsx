import { Heading3 } from "@/components/atoms/Heading3";
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
  max-width: 500px;
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
  const stripe = loadStripe(
    "pk_test_51Hhw4xJuQS0ZmhQxoAin6ozbLtE2TDYKYp68V528uhGVvlrJBGlWUWN78ux7ux5TmFJpfE9tRUDFsN5rJfuTj2ct00uXjdO5d6"
  );

  return (
    <SettingLayout title="Kanon Code | カード情報" authUser={props.authUser}>
      <Box textAlign="center">
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
                      padding: "16px",
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
              カード情報をStripeにのみ送信・保存されます
            </ListItem>
            <ListItem disableGutters dense>
              レビュワーのユーザー名を知ることができます
            </ListItem>
            <ListItem disableGutters dense>
              お支払いに関するQ＆A
            </ListItem>
          </List>
        </StyledBox>
      </Box>
    </SettingLayout>
  );
};

export default IndexPage;
