import { CustomLoader } from '@/components/common/loader'
import { ContentHeader } from '@/components/molecules/ContentHeader'
import { ProfileContentLink } from '@/components/molecules/ProfileContentLink'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper'
import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext'
import { useCredit } from '@/hooks/useCredit'
import { SettingLayout } from '@/layouts/setting/'
import { UserTypes } from '@/types/global'
import React from 'react'
import styled from 'styled-components'
import CreditSvg from '../../../assets/illustration/credit.svg'

type Props = {
  title: string
  authUser: any
  currentUser: UserTypes | null
}

const StyledPairCreditSvg = styled(CreditSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>
  const userId = props.authUser.username
  const { credit, isLoading } = useCredit(userId)

  return (
    <SettingLayout
      title={`Kanon Code | クレジットカード情報`}
      currentUser={props.currentUser}
    >
      {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <>
          <section>
            {credit ? (
              <ContentWrapper>
                <ContentHeader
                  title="Credit Card"
                  description="登録したカード情報でレビューを購入することができます"
                  fontSize={20}
                  marginBottom={1}
                />
                <ProfileContentLink
                  label="クレジットカード"
                  value={credit.customChara}
                  isDivider={false}
                  href="/billing"
                >
                  <IconArrowNext fontSize="large" color="action" />
                </ProfileContentLink>
              </ContentWrapper>
            ) : (
              <NoSettingDataWrapper
                text="クレジットカードを登録する"
                description="
            レビューを購入するにはクレジットカードの登録が必要です。
          "
                href="/billing"
                borderRadius={4}
                mb={6}
              >
                <StyledPairCreditSvg />
              </NoSettingDataWrapper>
            )}
          </section>
        </>
      )}
    </SettingLayout>
  )
}

export default IndexPage
