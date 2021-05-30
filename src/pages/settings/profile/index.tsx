import { CustomLoader } from '@/components/common/loader'
import { ContentHeader } from '@/components/molecules/ContentHeader'
import { FileExChange } from '@/components/molecules/FileExChange'
import { ProfileContentFile } from '@/components/molecules/ProfileContentFile'
import { ProfileContentLink } from '@/components/molecules/ProfileContentLink'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext'
import { UserProfileProps } from '@/types/pages/settings/profile'
import { getUser } from '@/utils/api/get-user'
import React, { useEffect, useState } from 'react'

type Props = {
  title: string
  authUser: any
}

export const getServerSideProps = async () => ({
  props: {
    layout: 'SettingLayout',
    title: 'プロフィール',
  },
})

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfileProps>()
  useEffect(() => {
    const err = new Error()
    ;(async () => {
      const params = {
        userId: props.authUser.username,
      }
      try {
        const response = await getUser(params)
        const result = response.data
        if (!result.status) throw (err.message = result.status_message)
        setProfile(result.Item.user_profile)
        setIsLoading(false)
      } catch (error) {
        alert(error)
      }
    })()
  }, [])

  return isLoading ? (
    <CustomLoader width={40} height={40} />
  ) : (
    <section>
      <ContentWrapper>
        <ContentHeader
          title="プロフィール"
          description="Kanon Codeを利用する全てのユーザーに公開されます。"
          fontSize={20}
          marginBottom={1}
        />
        <ProfileContentFile
          label="アイコン"
          description="写真を追加することでアカウントをカスタマイズできます"
          isDivider={false}
          htmlFor="avatar"
        >
          <FileExChange htmlFor="avatar" picture={profile!.icon_src} />
        </ProfileContentFile>
        <ProfileContentLink
          label="名前"
          value={profile!.display_name}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>
        <ProfileContentLink
          label="紹介文"
          value={profile!.introduction}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="ポジション"
          value={profile!.position_type}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="100文字あたりの設定金額"
          value={profile!.price}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="Githubユーザーネーム"
          value={profile!.github_name}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="Twitterユーザーネーム"
          value={profile!.twitter_name}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>

        <ProfileContentLink
          label="webサイト"
          value={profile!.web_site}
          isDivider={true}
          href="/"
        >
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentLink>
      </ContentWrapper>
    </section>
  )
}

export default IndexPage
