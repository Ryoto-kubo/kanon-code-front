import { ContentHeader } from '@/components/molecules/ContentHeader'
// import { bankData } from '@/mock/bank'
import { ProfileContentLink } from '@/components/molecules/ProfileContentLink'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper'
import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext'
import React from 'react'
import styled from 'styled-components'
import BankSvg from '../../../assets/illustration/bank.svg'

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
  const bankDataLength = 1
  // const bankDataLength = bankData.length

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
          <ProfileContentLink
            label="銀行コード"
            value={'0001'}
            isDivider={false}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="銀行名"
            value={'ゆうちょ銀行'}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="支店コード"
            value={'003'}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="支店名"
            value={'りんご支店'}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="預金種類"
            value={'普通'}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="口座番号"
            value={'1234567'}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
          <ProfileContentLink
            label="口座名義（カナ）"
            value={'カノンコード'}
            isDivider={true}
            href="/"
          >
            <IconArrowNext fontSize="large" color="action" />
          </ProfileContentLink>
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
    </section>
  )
}

export default IndexPage
