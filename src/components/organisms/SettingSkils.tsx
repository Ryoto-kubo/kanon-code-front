import { BackPage } from '@/components/molecules/BackPage'
import React from 'react'

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
}

export const SettingSkils: React.FC<Props> = (props) => {
  const { linkText, ...backPageProps } = props

  return <BackPage {...backPageProps}>{linkText}</BackPage>
}
