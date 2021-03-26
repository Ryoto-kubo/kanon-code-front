import { BaseSelectTextField } from '@/components/atoms/SelectTextField.tsx'
import { BaseTextField } from '@/components/atoms/TextField.tsx'
import { HelpButton } from '@/components/molecules/HelpButton'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import React from 'react'

type Props = {
  settingParams: {
    name: string
    introduction: string
    amount: number
    position: number
    githubName: string
    twitterName: string
    webSite: string
  }
  renderOptions: JSX.Element[]
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeIntroduction: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePosition: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeGithubName: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTwitterName: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeWebSite: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleClose: () => void
  anchorEl: HTMLElement | null
  open: boolean
}

export const SettingProfileFields: React.FC<Props> = (props) => {
  return (
    <>
      <Box mb={4}>
        <BaseTextField
          id="name"
          type="text"
          value={props.settingParams.name}
          label="名前"
          placeholder="名前"
          onChange={props.onChangeName}
          rows={0}
        />
      </Box>
      <Box mb={4}>
        <BaseTextField
          id="introduction"
          type="text"
          value={props.settingParams.introduction}
          label="紹介文"
          placeholder="紹介文を入力して下さい"
          onChange={props.onChangeIntroduction}
          multiline={true}
          rows={6}
        />
      </Box>
      <Box mb={4}>
        <BaseSelectTextField
          id="position"
          value={props.settingParams.position}
          label="ポジション"
          renderOptions={props.renderOptions}
          onChange={props.onChangePosition}
        />
      </Box>
      <Box mb={4}>
        <Box mb={1.5} display="flex" alignItems="center">
          <Box component="span" mr={0.5}>
            100文字あたりの設定金額とは
          </Box>
          <HelpButton func={props.handleMenu} />
          <Popover
            id="menu-appbar"
            anchorEl={props.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={props.open}
            onClose={props.handleClose}
          >
            <Box p={2} lineHeight={1.8} maxWidth={375}>
              コードレビューを行った際に設定できる価格の基準です。
              <br />
              500円に設定しレビューを600文字書くと、最大設定価格は3,000円になります。
            </Box>
          </Popover>
        </Box>
        <BaseTextField
          id="amount"
          type="text"
          value={props.settingParams.amount}
          label="100文字あたりの設定金額（円）"
          placeholder="100"
          onChange={props.onChangeAmount}
          inputMode="numeric"
          rows={0}
        />
      </Box>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between">
          <BaseTextField
            id="githubName"
            type="text"
            style={{ width: '47%', display: 'block' }}
            value={props.settingParams.githubName}
            placeholder="Github name"
            label="Githubユーザー名"
            onChange={props.onChangeGithubName}
            inputMode="url"
            rows={0}
          />
          <BaseTextField
            id="twitterName"
            type="text"
            style={{ width: '47%', display: 'block' }}
            value={props.settingParams.twitterName}
            placeholder="Twitter name"
            label="Twitterユーザー名"
            onChange={props.onChangeTwitterName}
            inputMode="url"
            rows={0}
          />
        </Box>
      </Box>
      <Box mb={4}>
        <BaseTextField
          id="webSite"
          type="text"
          value={props.settingParams.webSite}
          label="webサイト"
          placeholder="https://example.com"
          onChange={props.onChangeWebSite}
          rows={0}
        />
      </Box>
    </>
  )
}
