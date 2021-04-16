import { ContentHeader } from '@/components/molecules/ContentHeader'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper'
import React from 'react'
import styled from 'styled-components'
import BankSvg from '../../../assets/illustration/bank.svg'
// import {bankData} from '@/mock/bank'

// type BankParams = {
//   bankCode: string;
//   bankName: string;
//   branchCode: string;
//   branchName: string;
//   depositType: number | undefined;
//   accountNumber: string;
//   accountName: string;
// };

// const contained = {
//   background: theme.palette.primary.main,
//   color: "#ffffff",
// };

// const StyledBoxFlex = styled(Box)`
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     display: flex;
//     align-items: flex-start;
//   }
// `;
// const StyledBoxLabel = styled(Box)`
//   font-weight: bold;
//   margin-bottom: 16px;
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     flex-shrink: 0;
//     flex-basis: 180px;
//     margin-bottom: 0px;
//   }
// `;
// const StyledButtonBank = styled(Button)`
//   font-size: 12px;
//   padding: 3px 4px;
//   margin-right: 5px;
//   margin-bottom: 5px;
// `;
const StyledPairBankSvg = styled(BankSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`

export const getServerSideProps = async () => ({
  props: {
    layout: 'SettingLayout',
    title: 'お振込先',
  },
})

const IndexPage: React.FC = () => {
  const bankDataLength = 0
  // const skilsLength = bankData.length

  // const [stateValid, setStateValid] = useState({
  //   isBankCode: false,
  //   isBankName: false,
  //   isBranchCode: false,
  //   isBranchName: false,
  //   isDepositType: false,
  //   isAccountNumber: false,
  //   isAccountName: false,
  // });
  // const [bankParams, setBankParams] = useState<BankParams>({
  //   bankCode: "",
  //   bankName: "",
  //   branchCode: "",
  //   branchName: "",
  //   depositType: undefined,
  //   accountNumber: "",
  //   accountName: "",
  // });
  // const [bankAlignment, setBankAlignment] = useState<number | null>(null);
  // const [depositAlignment, setDepositAlignment] = useState<number | null>(null);

  // const changeBankCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const bankCode = e.target.value;
  //   setStateValid({ ...stateValid, isBankCode: bankCode.length > 4 });
  //   setBankParams({ ...bankParams, bankCode: e.target.value });
  // };
  // const changeBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const bankName = e.target.value;
  //   setStateValid({ ...stateValid, isBankName: bankName.length > 32 });
  //   setBankParams({ ...bankParams, bankName: bankName });
  // };
  // const changeBranchCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const branchCode = e.target.value;
  //   setStateValid({ ...stateValid, isBranchCode: branchCode.length > 3 });
  //   setBankParams({ ...bankParams, branchCode: branchCode });
  // };
  // const changeBranchName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const branchName = e.target.value;
  //   setStateValid({ ...stateValid, isBranchName: branchName.length > 32 });
  //   setBankParams({ ...bankParams, branchName: branchName });
  // };
  // const changeDepositType = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const depositType = Number(e.currentTarget.value);
  //   setDepositAlignment(depositType);
  //   setBankParams({ ...bankParams, depositType: depositType });
  // };
  // const changeAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const accountNumber = e.target.value;
  //   setStateValid({ ...stateValid, isAccountNumber: accountNumber.length > 8 });
  //   setBankParams({ ...bankParams, accountNumber: accountNumber });
  // };
  // const changeAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const accountName = e.target.value;
  //   setStateValid({ ...stateValid, isAccountName: accountName.length > 32 });
  //   setBankParams({ ...bankParams, accountName: accountName });
  // };
  // const update = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   console.log(bankParams);
  // };
  // const setBankCode = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const index = Number(e.currentTarget.value);
  //   const bankCode = banks[index].code;
  //   const bankName = banks[index].name;
  //   setBankAlignment(index);
  //   setBankParams({
  //     ...bankParams,
  //     bankCode: bankCode,
  //     bankName: `${bankName}銀行`,
  //   });
  //   setStateValid({ ...stateValid, isBankCode: false, isBankName: false });
  // };

  return (
    <section>
      {bankDataLength > 0 ? (
        <ContentWrapper>
          <ContentHeader
            title="お振込先"
            description="以下の口座に売り上げ金額を振り込むことができます。"
            fontSize={20}
            marginBottom={1}
          />
        </ContentWrapper>
      ) : (
        <NoSettingDataWrapper
          text="お振込先を登録する"
          description="売上の振込をするためにはお振込先の登録が必要です。"
          href="/bank"
          borderRadius={4}
          mb={6}
        >
          <StyledPairBankSvg />
        </NoSettingDataWrapper>
      )}

      {/* <Box mb={5}>
        <Box>
          <Box mb={3}>
            <Heading3 fontSize={18} marginBottom={0}>
              お振込先情報
            </Heading3>
            <p>※売上の振込申請をするためには口座情報の登録が必要です</p>
          </Box>
        </Box>
        <section>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>銀行コード(半角数字)</StyledBoxLabel>
            <Box>
              <Box mb={1}>
                <Box mb={0.5} minWidth={343} maxWidth={343}>
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
                  <ValidMessage validText="4桁以下の半角数字で入力してください" />
                )}
              </Box>
              <Box>
                {banks.map((el, index) => (
                  <StyledButtonBank
                    style={bankAlignment === index ? contained : {}}
                    key={el.id}
                    color="primary"
                    variant="outlined"
                    size="small"
                    disableElevation
                    value={index}
                    onClick={setBankCode}
                  >
                    {el.name}
                  </StyledButtonBank>
                ))}
              </Box>
            </Box>
          </StyledBoxFlex>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>銀行名</StyledBoxLabel>
            <Box mb={1}>
              <Box mb={0.5} minWidth={343} maxWidth={343}>
                <BaseTextField
                  id="name"
                  type="text"
                  value={bankParams.bankName}
                  label="銀行名"
                  placeholder="みずほ銀行"
                  onChange={changeBankName}
                  rows={0}
                  error={stateValid.isBankName}
                />
              </Box>
              {stateValid.isBankName && (
                <ValidMessage validText="32文字以下で入力してください" />
              )}
            </Box>
          </StyledBoxFlex>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>支店コード(半角数字)</StyledBoxLabel>
            <Box mb={1}>
              <Box mb={0.5} minWidth={343} maxWidth={343}>
                <BaseTextField
                  id="name"
                  type="text"
                  value={bankParams.branchCode}
                  label="支店コード"
                  placeholder="001"
                  onChange={changeBranchCode}
                  inputMode="numeric"
                  rows={0}
                  error={stateValid.isBranchCode}
                />
              </Box>
              {stateValid.isBranchCode && (
                <ValidMessage validText="3桁以下の半角数字で入力してください" />
              )}
            </Box>
          </StyledBoxFlex>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>支店名</StyledBoxLabel>
            <Box mb={1}>
              <Box mb={0.5} minWidth={343} maxWidth={343}>
                <BaseTextField
                  id="name"
                  type="text"
                  value={bankParams.branchName}
                  label="支店名"
                  placeholder="リンゴ支店"
                  onChange={changeBranchName}
                  rows={0}
                  error={stateValid.isBranchName}
                />
              </Box>
              {stateValid.isBranchName && (
                <ValidMessage validText="32文字以下で入力してください" />
              )}
            </Box>
          </StyledBoxFlex>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>預金種類</StyledBoxLabel>
            <Box>
              {depositTypes.map((el, index) => (
                <StyledButtonBank
                  style={depositAlignment === index ? contained : {}}
                  key={el.id}
                  color="primary"
                  variant="outlined"
                  size="small"
                  disableElevation
                  value={index}
                  onClick={changeDepositType}
                >
                  {el.name}
                </StyledButtonBank>
              ))}
            </Box>
          </StyledBoxFlex>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>口座番号(半角数字)</StyledBoxLabel>
            <Box mb={1}>
              <Box mb={0.5} minWidth={343} maxWidth={343}>
                <BaseTextField
                  id="name"
                  type="text"
                  value={bankParams.accountNumber}
                  label="口座番号"
                  placeholder="1234567"
                  onChange={changeAccountNumber}
                  inputMode="numeric"
                  rows={0}
                  error={stateValid.isAccountNumber}
                />
              </Box>
              {stateValid.isAccountNumber && (
                <ValidMessage validText="7~8桁の半角数字で入力してください" />
              )}
            </Box>
          </StyledBoxFlex>
          <StyledBoxFlex mb={4}>
            <StyledBoxLabel>口座名義カナ(全角)</StyledBoxLabel>
            <Box mb={1}>
              <Box mb={0.5} minWidth={343} maxWidth={343}>
                <BaseTextField
                  id="name"
                  type="text"
                  value={bankParams.accountName}
                  label="口座名義"
                  placeholder="カノン タロウ"
                  onChange={changeAccountName}
                  rows={0}
                  error={stateValid.isAccountName}
                />
              </Box>
              {stateValid.isAccountName && (
                <ValidMessage validText="32文字以下で入力してください" />
              )}
            </Box>
          </StyledBoxFlex>
          <Box textAlign="center">
            <CustomSolidButton sizing="medium" onClick={update}>
              更新する
            </CustomSolidButton>
          </Box>
        </section>
      </Box> */}
    </section>
  )
}

export default IndexPage
