import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'
import React from 'react'

type Props = {
  title: string
  authUser: any
}

const IndexPage: React.FC<Props> = (props) => {
  const userPayload = props.authUser.signInUserSession.idToken.payload
  axios
    .post(apis.REGISTER, userPayload)
    .then((res) => {
      console.log(res, 'res')
    })
    .catch((err) => {
      console.log(err)
    })
  return <></>
}

export default IndexPage
