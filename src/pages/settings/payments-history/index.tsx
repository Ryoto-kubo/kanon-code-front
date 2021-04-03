import { Heading3 } from "@/components/atoms/Heading3";
import { IconLaravel } from "@/components/atoms/IconLaravel";
import { IconNode } from "@/components/atoms/IconNode";
import { IconVue } from "@/components/atoms/IconVue";
import { PostHeader } from "@/components/molecules/PostHeader";
import { SettingLayout } from "@/layouts/setting";
import { paymentDatas } from "@/mock/payment-datas";
import theme from "@/styles/theme";
import { CognitoUser } from "@aws-amplify/auth";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
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
  const isPayments = false;
  const getProgramingIcon = (iconKey: string) => {
    switch (iconKey) {
      case "vue.js":
        return <IconVue width={50} height={50} />;
      case "laravel":
        return <IconLaravel width={50} height={50} />;
      case "node.js":
        return <IconNode width={50} height={50} />;
    }
  };

  return (
    <SettingLayout title="Kanon Code | 購入履歴" authUser={props.authUser}>
      <Box mb={5}>
        <Box mb={3}>
          <Heading3 fontSize={18} marginBottom={0}>
            購入したレビュー
          </Heading3>
        </Box>
        {!isPayments && <StyledBox>購入したレビューはありません。</StyledBox>}
        {isPayments &&
          paymentDatas.map((el, index) => (
            <Box key={index} mb={3}>
              <Box display="flex" alignItems="center">
                <Box mr={2}>{getProgramingIcon(el.iconKey)}</Box>
                <PostHeader
                  key={index}
                  title={el.title}
                  tagArray={el.tagArray}
                />
              </Box>
              <Divider />
            </Box>
          ))}
      </Box>
    </SettingLayout>
  );
};

export default IndexPage;
