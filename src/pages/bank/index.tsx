import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { BaseTextField } from '@/components/atoms/TextField.tsx'
import { CustomLoader } from '@/components/common/loader'
import { ValidMessage } from '@/components/molecules/ValidMessage'
import { SettingForm } from '@/components/organisms/SettingForm'
import { BANKS, DEPOSIT_TYPES } from '@/consts/banks'
import * as CONST from '@/consts/const'
import { INITIAL_BANK } from '@/consts/const'
import { errorMessages } from '@/consts/error-messages'
import { messages } from '@/consts/messages'
import { SettingLayout } from '@/layouts/setting-form'
import theme from '@/styles/theme'
import { BankTypes, UserTypes } from '@/types/global'
import { getBank } from '@/utils/api/get-bank'
import { postBank } from '@/utils/api/post-bank'
import { UserProfile } from '@/utils/user-profile'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  authUser: any
  currentUser: UserTypes | null
}
type BankKeyTypes = Readonly<
  | 'bank_code'
  | 'bank_name'
  | 'branch_code'
  | 'branch_name'
  | 'deposit_type'
  | 'account_number'
  | 'account_name'
>
type ValidObjectTypes = {
  isBankCode: boolean
  isBankName: boolean
  isBranchCode: boolean
  isBranchName: boolean
  isDepositType: boolean
  isAccountNumber: boolean
  isAccountName: boolean
}
type ValidKeyTypes = Readonly<
  | 'isBankCode'
  | 'isBankName'
  | 'isBranchCode'
  | 'isBranchName'
  | 'isDepositType'
  | 'isAccountNumber'
  | 'isAccountName'
>

const contained = {
  background: theme.palette.primary.main,
  color: '#ffffff',
}
const StyledBoxFlex = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    align-items: flex-start;
  }
`
const StyledBoxLabel = styled(Box)`
  font-weight: bold;
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    flex-shrink: 0;
    flex-basis: 180px;
    margin-bottom: 0px;
  }
`
const StyledButtonBank = styled(Button)`
  font-size: 12px;
  padding: 3px 4px;
  margin-right: 5px;
  margin-bottom: 5px;
`
const StyledButtonWrapper = styled(Box)`
  text-align: center;
`

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>
  const userId = props.authUser.username
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDidabled] = useState<boolean>(true)
  const [updatingMessage, setUpdatingMessage] = useState('更新中...')
  const [isLoading, setIsLoading] = useState(true)
  const [stateValid, setStateValid] = useState<ValidObjectTypes>({
    isBankCode: true,
    isBankName: true,
    isBranchCode: true,
    isBranchName: true,
    isDepositType: true,
    isAccountNumber: true,
    isAccountName: true,
  })
  const [bank, setBank] = useState<BankTypes>(INITIAL_BANK)
  const [bankAlignment, setBankAlignment] = useState<string | null>(null)
  const [depositAlignment, setDepositAlignment] = useState<number | null>(null)

  useEffect(() => {
    const err = new Error()
    ;(async () => {
      try {
        const response = await getBank({ userId })
        const result = response.data
        if (!result.status) throw (err.message = result.status_message)
        setBank(result.Item ? result.Item.bank : INITIAL_BANK)
        setDepositAlignment(result.Item ? result.Item.bank.deposit_type : null)
        setBankAlignment(result.Item ? result.Item.bank.bank_code : null)
        setIsLoading(false)
      } catch {
        console.error(err)
        alert(errorMessages.SYSTEM_ERROR)
      }
    })()
  }, [])

  const makeValidList = (tempStateValidList: ValidObjectTypes) => {
    const list = Object.keys(tempStateValidList).map((key: string) => {
      const newKey: keyof ValidObjectTypes = key as ValidKeyTypes
      return stateValid[newKey]
    })
    return list
  }

  // HACK:If there is unentered or false data, it will be disabled.
  const confirmInput = (
    tempBank: BankTypes,
    tempStateValidList: ValidObjectTypes,
  ) => {
    let isResult = true
    const validList = makeValidList(tempStateValidList)
    for (const key in tempBank) {
      const newKey: keyof BankTypes = key as BankKeyTypes
      const isEmpty = tempBank[newKey] === ''
      const isNull = tempBank[newKey] === null
      const isExistFalse = validList.includes(false)
      if (isEmpty || isNull || isExistFalse) {
        setIsDidabled(true)
        isResult = false
        break
      }
    }
    isResult && setIsDidabled(false)
  }

  const changeBankCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isValid = UserProfile.validMaxLength(
      value.length,
      CONST.MAX_BANK_CODE_LENGTH,
    )
    stateValid.isBankCode = isValid
    bank.bank_code = value
    const tempStateValidList = stateValid
    const tempBank = bank
    setIsDidabled(!isValid)
    setStateValid({ ...stateValid, isBankCode: isValid })
    setBank({ ...bank, bank_code: value })
    setBankAlignment(null)
    confirmInput(tempBank, tempStateValidList)
  }

  const changeBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isValid = UserProfile.validMaxLength(
      value.length,
      CONST.MAX_BANK_NAME_LENGTH,
    )
    stateValid.isBankName = isValid
    bank.bank_name = value
    const tempStateValidList = stateValid
    const tempBank = bank
    setIsDidabled(!isValid)
    setStateValid({ ...stateValid, isBankName: isValid })
    setBank({ ...bank, bank_name: value })
    confirmInput(tempBank, tempStateValidList)
  }

  const changeBranchCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isValid = UserProfile.validMaxLength(
      value.length,
      CONST.MAX_BRANCH_CODE_LENGTH,
    )
    stateValid.isBranchCode = isValid
    bank.branch_code = value
    const tempStateValidList = stateValid
    const tempBank = bank
    setIsDidabled(!isValid)
    setStateValid({ ...stateValid, isBranchCode: isValid })
    setBank({ ...bank, branch_code: value })
    confirmInput(tempBank, tempStateValidList)
  }

  const changeBranchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isValid = UserProfile.validMaxLength(
      value.length,
      CONST.MAX_BRANCH_NAME_LENGTH,
    )
    stateValid.isBranchName = isValid
    bank.branch_name = value
    const tempStateValidList = stateValid
    const tempBank = bank
    setIsDidabled(!isValid)
    setStateValid({ ...stateValid, isBranchName: isValid })
    setBank({ ...bank, branch_name: value })
    confirmInput(tempBank, tempStateValidList)
  }

  const changeDepositType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = Number(e.currentTarget.value)
    bank.deposit_type = value
    const tempBank = bank
    setStateValid({ ...stateValid, isDepositType: true })
    setDepositAlignment(value)
    setBank({ ...bank, deposit_type: value })
    confirmInput(tempBank, stateValid)
  }

  const changeAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isValid = UserProfile.validMaxLength(
      value.length,
      CONST.MAX_ACCOUNT_NUMBER_LENGTH,
    )
    stateValid.isAccountNumber = isValid
    bank.account_number = value
    const tempStateValidList = stateValid
    const tempBank = bank
    setIsDidabled(!isValid)
    setStateValid({ ...stateValid, isAccountNumber: isValid })
    setBank({ ...bank, account_number: value })
    confirmInput(tempBank, tempStateValidList)
  }

  const changeAccountName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isValid = UserProfile.validMaxLength(
      value.length,
      CONST.MAX_ACCOUNT_NAME_LENGTH,
    )
    stateValid.isAccountName = isValid
    bank.account_name = value
    const tempStateValidList = stateValid
    const tempBank = bank
    setIsDidabled(!isValid)
    setStateValid({ ...stateValid, isAccountName: isValid })
    setBank({ ...bank, account_name: value })
    confirmInput(tempBank, tempStateValidList)
  }

  const setBankCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.value)
    const bankCode = BANKS[index].code
    const bankName = BANKS[index].name
    stateValid.isBankCode = true
    stateValid.isBankName = true
    bank.bank_code = bankCode
    bank.bank_name = bankName
    const tempStateValidList = stateValid
    const tempBank = bank
    setStateValid({ ...stateValid, isBankCode: true, isBankName: true })
    setBankAlignment(bankCode)
    setBank({
      ...bank,
      bank_code: bankCode,
      bank_name: `${bankName}銀行`,
    })
    confirmInput(tempBank, tempStateValidList)
  }

  const update = async () => {
    const err = new Error()
    if (depositAlignment === null) {
      setStateValid({ ...stateValid, isDepositType: false })
      return
    }
    setUpdatingMessage('更新中...')
    setIsOpen(true)
    try {
      const result = await postBank({ userId, bank })
      if (!result.status) throw err
      setUpdatingMessage(messages.UPDATED_MESSAGE)
    } catch {
      setIsOpen(false)
      alert(errorMessages.SYSTEM_ERROR)
    }
  }

  return (
    <SettingLayout
      title="Kanon Code | お振込先設定"
      currentUser={props.currentUser}
    >
      <SettingForm
        linkText="Bank account"
        href="/settings/bank"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        {isLoading ? (
          <CustomLoader width={40} height={40} />
        ) : (
          <>
            <Box mb={5}>
              <StyledBoxFlex mb={4}>
                <StyledBoxLabel>銀行コード(半角数字)</StyledBoxLabel>
                <Box>
                  <Box mb={1}>
                    <Box mb={0.5} minWidth={343} maxWidth={343}>
                      <BaseTextField
                        id="name"
                        type="text"
                        value={bank.bank_code}
                        label="銀行コード"
                        placeholder="0001"
                        onChange={changeBankCode}
                        inputMode="numeric"
                        rows={0}
                        error={!stateValid.isBankCode}
                      />
                    </Box>
                    {!stateValid.isBankCode && (
                      <ValidMessage validText="4桁以下の半角数字で入力してください" />
                    )}
                  </Box>
                  <Box maxWidth={500}>
                    {BANKS.map((el, index) => (
                      <StyledButtonBank
                        style={bankAlignment === el.code ? contained : {}}
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
                      value={bank.bank_name}
                      label="銀行名"
                      placeholder="みずほ銀行"
                      onChange={changeBankName}
                      rows={0}
                      error={!stateValid.isBankName}
                    />
                  </Box>
                  {!stateValid.isBankName && (
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
                      value={bank.branch_code}
                      label="支店コード"
                      placeholder="001"
                      onChange={changeBranchCode}
                      inputMode="numeric"
                      rows={0}
                      error={!stateValid.isBranchCode}
                    />
                  </Box>
                  {!stateValid.isBranchCode && (
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
                      value={bank.branch_name}
                      label="支店名"
                      placeholder="リンゴ支店"
                      onChange={changeBranchName}
                      rows={0}
                      error={!stateValid.isBranchName}
                    />
                  </Box>
                  {!stateValid.isBranchName && (
                    <ValidMessage validText="32文字以下で入力してください" />
                  )}
                </Box>
              </StyledBoxFlex>
              <StyledBoxFlex mb={4}>
                <StyledBoxLabel>預金種類</StyledBoxLabel>
                <Box>
                  {DEPOSIT_TYPES.map((el, index) => (
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
                {!stateValid.isDepositType && (
                  <ValidMessage validText="預金種類を選択してください" />
                )}
              </StyledBoxFlex>
              <StyledBoxFlex mb={4}>
                <StyledBoxLabel>口座番号(半角数字)</StyledBoxLabel>
                <Box mb={1}>
                  <Box mb={0.5} minWidth={343} maxWidth={343}>
                    <BaseTextField
                      id="name"
                      type="text"
                      value={bank.account_number}
                      label="口座番号"
                      placeholder="1234567"
                      onChange={changeAccountNumber}
                      inputMode="numeric"
                      rows={0}
                      error={!stateValid.isAccountNumber}
                    />
                  </Box>
                  {!stateValid.isAccountNumber && (
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
                      value={bank.account_name}
                      label="口座名義"
                      placeholder="カノン タロウ"
                      onChange={changeAccountName}
                      rows={0}
                      error={!stateValid.isAccountName}
                    />
                  </Box>
                  {!stateValid.isAccountName && (
                    <ValidMessage validText="32文字以下で入力してください" />
                  )}
                </Box>
              </StyledBoxFlex>
              <StyledButtonWrapper>
                <CustomSolidButton
                  sizing="small"
                  onClick={update}
                  disabled={isDisabled}
                >
                  登録
                </CustomSolidButton>
              </StyledButtonWrapper>
            </Box>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={isOpen}
              message={updatingMessage}
            />
          </>
        )}
      </SettingForm>
    </SettingLayout>
  )
}

export default IndexPage
