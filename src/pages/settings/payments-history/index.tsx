import { Heading3 } from "@/components/atoms/Heading3";
import { PostHeader } from "@/components/molecules/PostHeader";
import { IconLaravel } from "@/components/svg/programing/IconLaravel";
import { IconNode } from "@/components/svg/programing/IconNode";
import { IconVue } from "@/components/svg/programing/IconVue";
import { paymentDatas } from "@/mock/payment-datas";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { fade } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  width: 100%;
  margin: auto;
  margin-bottom: 32px;
  // max-width: 600px;
  padding: 16px;
  background: ${fade(theme.palette.primary.main, 0.1)};
`;

export const getServerSideProps = async () => ({
  props: {
    layout: "SettingLayout",
    title: "購入履歴",
  },
});

const IndexPage: React.FC = () => {
  const isPayments = true;
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
    <section>
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
                  postUrl=""
                  title={el.title}
                  tagArray={el.tagArray}
                />
              </Box>
              <Divider />
            </Box>
          ))}
      </Box>
    </section>
  );
};

export default IndexPage;
