import { ContentHeader } from '@/components/molecules/ContentHeader'
import { ProfileContentLink } from '@/components/molecules/ProfileContentLink'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper'
import { skils } from '@/mock/skils'
import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import SkilSvg from '../../../assets/illustration/skil.svg'

const StyledPairSkilSvg = styled(SkilSvg)`
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
    title: 'スキル設定',
  },
})

const IndexPage: React.FC = () => {
  const skilsLength = 0
  // const skilsLength = skils.length

  return (
    <section>
      {skilsLength > 0 ? (
        <ContentWrapper>
          <ContentHeader
            title="スキル"
            description="マイページにスキル一覧として表示されます。"
            fontSize={20}
            marginBottom={1}
          />
          {skils.map((el, index) => (
            <ProfileContentLink
              key={uuidv4()}
              label={el.language}
              value={el.yearsExperiences}
              isDivider={index === 0 ? false : true}
              href=""
            >
              {''}
            </ProfileContentLink>
          ))}
        </ContentWrapper>
      ) : (
        <NoSettingDataWrapper
          text="スキルを登録する"
          description="スキルはまだ登録されていません。"
          href="/skils"
          borderRadius={4}
          mb={6}
        >
          <StyledPairSkilSvg />
        </NoSettingDataWrapper>
      )}
    </section>
  )
}

export default IndexPage
