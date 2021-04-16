// import { Heading3 } from "@/components/atoms/Heading3";
// import Checkbox from "@material-ui/core/Checkbox";
// import Divider from "@material-ui/core/Divider";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CustomSwitch } from '@/components/atoms/CustomSwitch'
import { ContentHeader } from '@/components/molecules/ContentHeader'
import { LinkGithubButton } from '@/components/molecules/LinkGithubButton'
import { ProfileContentCheck } from '@/components/molecules/ProfileContentCheck'
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext'
import React, { useState } from 'react'

// import styled from "styled-components";

type Props = {
  title: string
  authUser: any
}

export const getServerSideProps = async () => ({
  props: {
    layout: 'SettingLayout',
    title: 'アクティビティ',
  },
})

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>
  const [state, setState] = useState({
    isOpenedReview: false,
    isReviewRequest: false,
  })
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
  }
  // const googleEmail = props.authUser.signInUserSession.idToken.payload.email;
  function isOpenReview(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.currentTarget.checked
    setState({ ...state, isOpenedReview: isChecked })
  }
  function isReviewRequest(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.currentTarget.checked
    setState({ ...state, isReviewRequest: isChecked })
  }

  return (
    <section>
      <ContentWrapper>
        <ContentHeader
          title="メール通知"
          description="ONにすることによってKanon Codeをより使いやすく設定できます。"
          fontSize={20}
          marginBottom={1}
        />
        <ProfileContentCheck
          label="レビューが開封された時"
          value={state.isOpenedReview ? 'ON' : 'OFF'}
          isDivider={false}
        >
          <CustomSwitch onChange={isOpenReview} />
        </ProfileContentCheck>
        <ProfileContentCheck
          label="レビューリクエストを受け取ったとき"
          value={state.isReviewRequest ? 'ON' : 'OFF'}
          isDivider={true}
        >
          <CustomSwitch onChange={isReviewRequest} />
        </ProfileContentCheck>
      </ContentWrapper>
      <ContentWrapper>
        <ContentHeader
          title="連携"
          description="Github連携を行うことでKanon Codeをより使いやすく設定できます。"
          fontSize={20}
          marginBottom={1}
        />
        <ProfileContentCheck
          label="Github連携"
          value={state.isOpenedReview ? 'ON' : 'OFF'}
          isDivider={false}
        >
          <LinkGithubButton onClick={linkOnGithub} />
        </ProfileContentCheck>
      </ContentWrapper>
      <ContentWrapper>
        <ContentHeader
          title="アカウント削除"
          description="アカウントが不要になった場合は削除できます。"
          fontSize={20}
          marginBottom={1}
        />
        <ProfileContentCheck label="アカウント削除" value="" isDivider={false}>
          <IconArrowNext fontSize="large" color="action" />
        </ProfileContentCheck>
      </ContentWrapper>
    </section>
  )
}

export default IndexPage
