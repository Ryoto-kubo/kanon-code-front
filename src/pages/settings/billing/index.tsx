import { ContentHeader } from "@/components/molecules/ContentHeader";
import { ContentWrapper } from "@/components/organisms/ContentWrapper";
import { NoSettingDataWrapper } from "@/components/organisms/NoSettingDataWrapper";
import React from "react";
import styled from "styled-components";
import CreditSvg from "../../../assets/illustration/credit.svg";

const StyledPairCreditSvg = styled(CreditSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 450px;
  }
`;

export const getServerSideProps = async () => ({
  props: {
    layout: "SettingLayout",
    title: "カード情報",
  },
});

const IndexPage: React.FC = () => {
  const billingAccountLength = 0;

  return (
    <section>
      {billingAccountLength > 0 ? (
        <ContentWrapper>
          <ContentHeader
            title="カード情報"
            description={`
                クレジットカード決済については、Stripeを利用しております。
                <br />
                この情報は当社では保持せず、決済代行会社であるStripe社で安全に管理されます。
              `}
            fontSize={20}
            marginBottom={1}
          />
        </ContentWrapper>
      ) : (
        <NoSettingDataWrapper
          text="クレジットカードを登録する"
          description="
            レビューを開封するにはクレジットカードの登録が必要です。
          "
          href="/billing"
          borderRadius={4}
          mb={6}
        >
          <StyledPairCreditSvg />
        </NoSettingDataWrapper>
      )}
    </section>
  );
};

export default IndexPage;
