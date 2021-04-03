import { Heading3 } from "@/components/atoms/Heading3";
import { BaseTextField } from "@/components/atoms/TextField.tsx";
import { banks } from "@/consts/banks";
import { SettingLayout } from "@/layouts/setting";
import theme from "@/styles/theme";
import { CognitoUser } from "@aws-amplify/auth";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: CognitoUser;
};

const StyledFlexBox = styled(Box)`
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: flex-start;
  }
`;
const StyledLabelBox = styled(Box)`
  font-weight: bold;
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    flex-shrink: 0;
    flex-basis: 180px;
    margin-bottom: 0px;
  }
`;
const StyledBankButton = styled(Button)`
  font-size: 12px;
  padding: 3px 4px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const IndexPage: React.FC<Props> = (props) => {
  const [stateValid, setStateValid] = useState({
    isBankCode: false,
    isBankName: false,
    isBranchCode: false,
    isBranchName: false,
    isDepositType: false,
    isAccountNumber: false,
    isAccountName: false,
  });
  const [bankParams, setBankParams] = useState({
    bankCode: "",
    bankName: "",
    branchCode: "",
    branchName: "",
    depositType: "",
    accountNumber: "",
    accountName: "",
  });
  const [alignment, setAlignment] = useState<number | null>(null);

  const changeBankCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bankCode = e.target.value;
    setStateValid({ ...stateValid, isBankCode: bankCode.length > 4 });
    setBankParams({ ...bankParams, bankCode: e.target.value });
  };
  const changeBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankParams({ ...bankParams, bankName: e.target.value });
  };
  const setBankCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.value);
    const bankCode = banks[index].code;
    const bankName = banks[index].name;
    setAlignment(index);
    setBankParams({
      ...bankParams,
      bankCode: bankCode,
      bankName: `${bankName}銀行`,
    });
    setStateValid({ ...stateValid, isBankCode: false });
  };

  return (
    <SettingLayout title="Kanon Code | お振込先情報" authUser={props.authUser}>
      <Box>
        <Box mb={3}>
          <Heading3 fontSize={18} marginBottom={0}>
            お振込先情報
          </Heading3>
          <p>※売上の振込申請をするためには口座情報の登録が必要です</p>
        </Box>
      </Box>
      <section>
        <StyledFlexBox mb={4}>
          <StyledLabelBox>銀行コード(半角数字)</StyledLabelBox>
          <Box>
            <Box mb={1}>
              <BaseTextField
                id="name"
                type="text"
                value={bankParams.bankCode}
                label="銀行コード"
                placeholder="0001"
                onChange={changeBankCode}
                inputMode="numeric"
                rows={0}
                error={stateValid.isBankCode}
              />
            </Box>
            {stateValid.isBankCode && (
              <Box display="flex" alignItems="center" mb={1}>
                <Box mr={0.5} height={20}>
                  <ErrorRoundedIcon
                    fontSize="small"
                    style={{ color: theme.palette.error.main }}
                  />
                </Box>
                <Box color={theme.palette.error.main}>
                  銀行コードは4桁以下で入力してください
                </Box>
              </Box>
            )}
            <Box>
              {banks.map((el, index) => (
                <StyledBankButton
                  key={index}
                  color="primary"
                  variant={alignment === index ? "contained" : "outlined"}
                  size="small"
                  disableElevation
                  value={index}
                  onClick={setBankCode}
                >
                  {el.name}
                </StyledBankButton>
              ))}
            </Box>
          </Box>
        </StyledFlexBox>
        <StyledFlexBox mb={4}>
          <StyledLabelBox>銀行名</StyledLabelBox>
          <Box>
            <Box mb={1}>
              <BaseTextField
                id="name"
                type="text"
                value={bankParams.bankName}
                label="銀行名"
                placeholder="みずほ銀行"
                onChange={changeBankName}
                rows={0}
              />
            </Box>
          </Box>
        </StyledFlexBox>
      </section>
    </SettingLayout>
  );
};

export default IndexPage;
