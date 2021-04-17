import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { BackPage } from '@/components/molecules/BackPage'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'

type Props = {
  linkText: string
  href: string
  headingFontSize: number
  marginBottom: number
  fontSize: 'small' | 'inherit' | 'default' | 'large' | undefined
  color:
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'primary'
    | 'secondary'
    | 'error'
    | undefined
  skilParams: {
    language: string
    yearsExperience: string
    value: number
  }[]
  yearsExperiences: {
    value: number
    label: string
  }[]
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const StyledBoxCalcWidth = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    // width: calc(100% - 150px);
  }
`
const StyledTextFieldService = styled(TextField)`
  margin-bottom: 32px;
  width: 47%;
`

export const SettingSkils: React.FC<Props> = (props) => {
  const {
    linkText,
    skilParams,
    yearsExperiences,
    onClick,
    ...backPageProps
  } = props

  const renderOptions = (): JSX.Element[] => {
    return yearsExperiences.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))
  }
  const renderTextFields = () => {
    return skilParams.map((elemet, index) => (
      <Box display="flex" justifyContent="space-between" key={index}>
        <StyledTextFieldService
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
          type="text"
          style={{ display: 'block' }}
          defaultValue={elemet.value}
          label="経験年数"
          fullWidth={true}
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value)
            const yearsExperience = yearsExperiences[value - 1].label
            elemet.value = value
            elemet.yearsExperience = yearsExperience
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
    <Box mb={6}>
      <Box mb={2}>
        <Box mb={4}>
          <BackPage {...backPageProps}>{linkText}</BackPage>
        </Box>
        {renderTextFields()}
      </Box>
      <Box textAlign="center">
        <CustomSolidButton sizing="small" onClick={onClick}>
          登録
        </CustomSolidButton>
      </Box>
    </Box>
  )
}
