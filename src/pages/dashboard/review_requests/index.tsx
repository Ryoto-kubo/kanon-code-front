import { LayoutDashboard } from '@/layouts/dashboard'
import { UserTypes } from '@/types/global'
import React from 'react'

type Props = {
  title: string
  authUser: any
  currentUser: UserTypes | null
}

const IndexPage: React.FC<Props> = (props) => {
  return (
    <LayoutDashboard
      title="Kanon Code | ダッシュボード:レビュー"
      currentUser={props.currentUser}
    >
      review_requests
    </LayoutDashboard>
  )
}

export default IndexPage
