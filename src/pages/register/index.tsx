import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { TypoHeading1 } from '@/components/atoms/TypoHeading1'
import { ValidMessage } from '@/components/molecules/ValidMessage'
import { RegisteredDialog } from '@/components/parts/RegisteredDialog'
import { reservedWords } from '@/consts/reserved-words'
import LayoutRegister from '@/layouts/register'
import theme from '@/styles/theme'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import styled from 'styled-components'
import WelcomSvg from '../../assets/illustration/welcome.svg'

type Props = {
  title: string
  authUser: any
}

const StyledContainer = styled(Container)`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`
const StyledWelcomSvg = styled(WelcomSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 80%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`
const StyledBoxWrapper = styled(Box)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 70%;
    margin: auto;
  }
`
const StyledBoxTextWrapper = styled(Box)`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.up('sm')} {
    font-size: 16px;
  }
`
const StyledBoxInputWrapper = styled(Box)`
  margin-bottom: 24px;
`
const StyledPUrlWrapper = styled('div')`
  margin: auto;
  margin-bottom: 32px;
  text-align: left;
  width: 100%;
  padding: 2px;
  border-bottom: 2px solid ${theme.palette.primary.main};
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 70%;
  }
`

const IndexPage: React.FC<Props> = (props) => {
  const domain = process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isReservedWord, setIsReservedWords] = useState<boolean>(false)
  const [name, setUserName] = useState<string>('')
  const findReservedWords = (value: string) => {
    const isFind = reservedWords.includes(value)
    setIsReservedWords(isFind)
  }
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    findReservedWords(value)
    setUserName(value)
  }
  const openShowModal = () => {
    if (isReservedWord) return
    setShowModal(true)
  }
  return (
    <LayoutRegister
      title="Kanon Code | ユーザーネーム登録"
      authUser={props.authUser}
    >
      <StyledContainer maxWidth="sm">
        <Box mb={2}>
          <TypoHeading1 color="primary">
            Welcome!!
            <br />
            Kanon Code
          </TypoHeading1>
          <StyledWelcomSvg />
        </Box>
        <StyledBoxWrapper>
          <StyledBoxTextWrapper>
            サービス内で使用する名前を決めましょう
          </StyledBoxTextWrapper>
          <StyledBoxInputWrapper>
            <TextField
              id="name"
              type="text"
              value={name}
              fullWidth
              label="name"
              placeholder="user name"
              onChange={changeName}
              rows={0}
            />
          </StyledBoxInputWrapper>
        </StyledBoxWrapper>
        <StyledPUrlWrapper>
          <Typography>
            {domain}
            {name}
          </Typography>
        </StyledPUrlWrapper>
        <StyledBoxWrapper>
          {isReservedWord && (
            <ValidMessage validText="既に使用されている名前です。" />
          )}
        </StyledBoxWrapper>
        <CustomSolidButton
          sizing="small"
          onClick={openShowModal}
          disabled={isReservedWord}
        >
          名前を決定する
        </CustomSolidButton>
      </StyledContainer>
      <RegisteredDialog showModal={showModal} name={name} />
    </LayoutRegister>
  )
}

export default IndexPage
