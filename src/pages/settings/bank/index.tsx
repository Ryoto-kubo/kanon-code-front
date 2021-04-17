import { ContentHeader } from '@/components/molecules/ContentHeader'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper'
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
  const bankDataLength = 0
  // const skilsLength = bankData.length

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
    </section>
  )
}

export default IndexPage
