import { CustomHeading2 } from '@/components/atoms/CustomHeading2'
import { ErrorView } from '@/components/common/error'
import { CustomLoader } from '@/components/common/loader'
import { Reviews } from '@/components/organisms/Reviews'
import { useUserContents } from '@/hooks/useUserContents'
import { LayoutDashboard } from '@/layouts/dashboard'
import { UserTypes } from '@/types/global'
import Box from '@material-ui/core/Box'
import React from 'react'

type Props = {
  title: string
  authUser: any
  currentUser: UserTypes | null
}

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser || !props.currentUser) return <></>
  const userName = props.currentUser.display_name
  const { data, isValidating } = useUserContents(userName)
  const status = data?.data.status
  if (status === false) {
    return (
      <LayoutDashboard
        title="Kanon Code | ダッシュボード:レビュー"
        currentUser={props.currentUser}
      >
        <ErrorView />
      </LayoutDashboard>
    )
  }
  const posts = data?.data.posts
  return (
    <LayoutDashboard
      title="Kanon Code | ダッシュボード:レビュー"
      currentUser={props.currentUser}
    >
      {isValidating ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <Box width={'100%'}>
          <CustomHeading2 fontSize={24} marginBottom={1}>
            Reviews
          </CustomHeading2>
          <Reviews user={props.authUser} posts={posts} isMe={true} />
        </Box>
      )}
    </LayoutDashboard>
  )
}

export default IndexPage
