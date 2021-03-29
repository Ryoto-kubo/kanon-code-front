import { Heading3 } from "@/components/atoms/Heading3";
import { SettingLayout } from "@/layouts/setting";
import theme from "@/styles/theme";
import { CognitoUser } from "@aws-amplify/auth";
import Box from "@material-ui/core/Box";
import { fade } from "@material-ui/core/styles";
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
  // max-width: 600px;
  padding: 16px;
  background: ${fade(theme.palette.primary.main, 0.1)};
`;

const IndexPage: React.FC<Props> = (props) => {
  return (
    <SettingLayout title="Kanon Code | 購入履歴" authUser={props.authUser}>
      <Box mb={5}>
        <Box mb={1}>
          <Heading3 fontSize={18} marginBottom={0}>
            購入したレビュー
          </Heading3>
        </Box>
        <StyledBox>購入したレビューはありません。</StyledBox>
      </Box>
    </SettingLayout>
  );
};

export default IndexPage;
