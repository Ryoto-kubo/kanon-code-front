import { CustomLoader } from '@/components/common/loader'
import { Reviews } from '@/components/organisms/Reviews'
import { apis } from '@/consts/api/'
import { LayoutDashboard } from '@/layouts/dashboard'
import { UserTypes } from '@/types/global'
import { getUserContents } from '@/utils/api/get-user-contents'
import Box from '@material-ui/core/Box'
import React from 'react'
import useSWR from 'swr'

type Props = {
  title: string
  authUser: any
  currentUser: UserTypes | null
}

const fetcher = async (userName: string) => {
  return await getUserContents({ userName: userName })
}
const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser || !props.currentUser) return <></>
  const userName = props.currentUser.display_name
  const { data, isValidating } = useSWR(
    apis.USERS_CONTENTS,
    () => fetcher(userName),
    {
      refreshInterval: 0,
      dedupingInterval: 2000,
      revalidateOnFocus: false,
      focusThrottleInterval: 5000,
    },
  )
  console.log(data)

  const posts = data?.data.posts
  const isLoading = isValidating

  return (
    <LayoutDashboard
      title="Kanon Code | ダッシュボード:レビュー"
      currentUser={props.currentUser}
    >
      {isLoading ? (
        <CustomLoader width={40} height={40} />
      ) : (
        <Box>
          <Reviews user={props.authUser} posts={posts!} isMe={true} />
        </Box>
      )}
    </LayoutDashboard>
  )
}

export default IndexPage
