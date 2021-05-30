import { ProfileArea } from '@/components/organisms/ProfileArea'
import { Reviews } from '@/components/organisms/Reviews'
import { SkilsArea } from '@/components/organisms/SkilsArea'
import Layout from '@/layouts/standard'
import { UserType } from '@/types/global'
import { PostContentsProps } from '@/types/global/index'
import { getUserContents } from '@/utils/api/get-user-contents'
import { Container } from '@material-ui/core/'
import Box from '@material-ui/core/Box'
import { GetStaticPropsContext } from 'next'
import React from 'react'

type Props = {
  authUser: any
  currentUser: null | UserType
  data: {
    user: UserType
    posts: PostContentsProps[]
  }
}

const IndexPage: React.FC<Props> = (props) => {
  console.log(props)
  const userProfile = props.data.user.user_profile
  const displayName = userProfile.display_name
  const userId = props.data.user.user_id
  const cognitoId = props.authUser ? `user_${props.authUser.username}` : null
  const isMe = cognitoId === userId

  return (
    <Layout
      title={`Kanon Code | ${displayName}`}
      currentUser={props.currentUser}
    >
      <Container>
        <Box mt={4}>
          <Box mb={3}>
            <ProfileArea
              picture={userProfile.icon_src}
              position={userProfile.position_type}
              githubName={userProfile.github_name}
              twitterName={userProfile.twitter_name}
              webSite={userProfile.web_site}
              displayName={userProfile.display_name}
              cognitoId={cognitoId}
              isMe={isMe}
            />
          </Box>
          <Box mb={3} component="section">
            <SkilsArea skils={userProfile.skils} />
          </Box>
          <Box mb={3} component="section">
            <Reviews
              user={props.authUser}
              posts={props.data.posts}
              isMe={isMe}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  // const result = await getUsers();
  // const paths = result.data.map((el: { displayName: string }) => ({
  //   params: {
  //     user_name: el.displayName,
  //   },
  // }));
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const userName = context.params?.user_name as string
  const result = await getUserContents({ userName: userName })
  return {
    props: {
      data: result.data,
    },
    revalidate: 60,
  }
}

export default IndexPage
