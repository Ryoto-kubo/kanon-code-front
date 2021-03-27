import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { yearsExperience } from '@/consts/select-options'
import { SettingLayout } from '@/layouts/setting'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
// import { CognitoUser } from '@aws-amplify/auth'
import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  authUser: any
}

type TypeParams = {
  language: string
  yearsExperience: number
}[]

const StyledSection = styled.section`
  margin-top: 24px;
`
const StyledBoxCalcWidth = styled(Box)`
  margin-bottom: 40px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    // width: calc(100% - 150px);
  }
`
const StyledTextFieldService = styled(TextField)`
  margin-bottom: 32px;
  width: 47%;
`

const IndexPage: React.FC<Props> = (props) => {
  const [skilParams, setSkilParams] = useState<TypeParams>([
    {
      language: '',
      yearsExperience: 0,
    },
    {
      language: '',
      yearsExperience: 0,
    },
    {
      language: '',
      yearsExperience: 0,
    },
    {
      language: '',
      yearsExperience: 0,
    },
    {
      language: '',
      yearsExperience: 0,
    },
  ])
  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(...skilParams)
  }
  const renderOptions = (): JSX.Element[] => {
    return yearsExperience.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))
  }
  const renderTextFields = () => {
    return skilParams.map((elemet, index) => (
      <Box display="flex" justifyContent="space-between" key={index}>
        <StyledTextFieldService
          id="language"
          type="text"
          style={{ display: 'block' }}
          defaultValue={elemet.language}
          placeholder="例：php"
          label="プログラミング言語"
          fullWidth={true}
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            elemet.language = e.target.value
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <StyledTextFieldService
          select
          id="twitterName"
          type="text"
          style={{ display: 'block' }}
          defaultValue={elemet.yearsExperience}
          label="経験年数"
          fullWidth={true}
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            elemet.yearsExperience = Number(e.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {renderOptions()}
        </StyledTextFieldService>
      </Box>
    ))
  }

  return (
    <SettingLayout title="Kanon Code | スキル設定" authUser={props.authUser}>
      <StyledSection>
        <Box>
          <StyledBoxCalcWidth>
            <div>{renderTextFields()}</div>
            <Box textAlign="center">
              <CustomSolidButton sizing="medium" onClick={update}>
                更新する
              </CustomSolidButton>
            </Box>
          </StyledBoxCalcWidth>
        </Box>
      </StyledSection>
    </SettingLayout>
  )
}

export default IndexPage
