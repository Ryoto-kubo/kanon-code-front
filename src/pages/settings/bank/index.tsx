import { CustomLoader } from "@/components/common/loader";
import { ContentHeader } from "@/components/molecules/ContentHeader";
import { ProfileContentLink } from "@/components/molecules/ProfileContentLink";
import { ContentWrapper } from "@/components/organisms/ContentWrapper";
import { NoSettingDataWrapper } from "@/components/organisms/NoSettingDataWrapper";
import { DEPOSIT_TYPES } from "@/consts/banks";
import { errorMessages } from "@/consts/error-messages";
import { SettingLayout } from "@/layouts/setting/";
import { BankTypes, UserTypes } from "@/types/global";
import { getBank } from "@/utils/api/get-bank";
// import { IconArrowNext } from "@/components/svg/materialIcons/IconArrowNext";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BankSvg from "../../../assets/illustration/bank.svg";

type Props = {
  title: string;
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledPairBankSvg = styled(BankSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 450px;
  }
`;

const IndexPage: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useState<UserTypes | null>(props.currentUser);
  const [userId] = useState(props.authUser.username);
  const [bank, setBank] = useState<BankTypes | null>();

  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getBank({ userId });
        const result = response.data;
        if (!result.status) throw (err.message = result.status_message);
        setBank(result.Item.bank);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert(errorMessages.SYSTEM_ERROR);
      }
    })();
  }, []);

  return (
    <SettingLayout title={`Kanon Code | お振込先`} currentUser={user}>
      {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <>
          <section>
            {!bank ? (
              <NoSettingDataWrapper
                text="お振込先を登録する"
                description="売上の振込をするためにはお振込先の登録が必要です。"
                href="/bank"
                borderRadius={4}
                mb={6}
              >
                <StyledPairBankSvg />
              </NoSettingDataWrapper>
            ) : (
              <ContentWrapper>
                <ContentHeader
                  title="Bank account"
                  description="以下の口座に売り上げ金額を振り込むことができます。"
                  fontSize={20}
                  marginBottom={1}
                />
                <ProfileContentLink
                  label="銀行コード"
                  value={bank.bank_code}
                  isDivider={false}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
                <ProfileContentLink
                  label="銀行名"
                  value={bank.bank_name}
                  isDivider={true}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
                <ProfileContentLink
                  label="支店コード"
                  value={bank.branch_code}
                  isDivider={true}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
                <ProfileContentLink
                  label="支店名"
                  value={bank.branch_name}
                  isDivider={true}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
                <ProfileContentLink
                  label="預金種類"
                  value={DEPOSIT_TYPES[bank.deposit_type!].name}
                  isDivider={true}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
                <ProfileContentLink
                  label="口座番号"
                  value={bank.account_number}
                  isDivider={true}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
                <ProfileContentLink
                  label="口座名義（カナ）"
                  value={bank.account_name}
                  isDivider={true}
                  href="/bank"
                >
                  {/* <IconArrowNext fontSize="large" color="action" /> */}
                </ProfileContentLink>
              </ContentWrapper>
            )}
          </section>
        </>
      )}
    </SettingLayout>
  );
};

export default IndexPage;
