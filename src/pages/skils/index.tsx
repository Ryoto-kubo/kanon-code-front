import { SettingSkils } from '@/components/organisms/SettingSkils'
import { yearsExperiences } from '@/consts/select-options'
import { SettingLayout } from '@/layouts/setting-form'
import React, { useState } from 'react'

type Props = {
  title: string
  authUser: any
}
type TypeParams = {
  language: string
  yearsExperience: string
  value: number
}[]

const IndexPage: React.FC<Props> = (props) => {
  const [skilParams, setSkilParams] = useState<TypeParams>([
    {
      language: '',
      yearsExperience: '1年~2年',
      value: 1,
    },
    {
      language: '',
      yearsExperience: '1年~2年',
      value: 1,
    },
    {
      language: '',
      yearsExperience: '1年~2年',
      value: 1,
    },
    {
      language: '',
      yearsExperience: '1年~2年',
      value: 1,
    },
    {
      language: '',
      yearsExperience: '1年~2年',
      value: 1,
    },
  ])
  const update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(...skilParams)
  }

  return (
    <SettingLayout title="Kanon Code | スキル" authUser={props.authUser}>
      <SettingSkils
        linkText="スキル"
        href="/settings/skil"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
        skilParams={skilParams}
        yearsExperiences={yearsExperiences}
        onClick={update}
      />
    </SettingLayout>
  )
}

export default IndexPage
