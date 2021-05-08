import { apis } from '@/consts/api/'
import { axios } from '@/utils/axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {
  title: string
  authUser: any
}
type ParamsType = {
  userId: string
}

const getUser = async (params: ParamsType) => {
  return await axios.get(apis.GET_USER, { params })
}
const registUser = async (payload: any) => {
  return await axios.post(apis.REGISTER, payload)
}
const IndexPage: React.FC<Props> = (props) => {
  const router = useRouter()
  const err = new Error()
  const payload = props.authUser.signInUserSession.idToken.payload
  const params = {
    userId: payload['cognito:username'],
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getUser(params)
        if (response.status !== 200) throw err
        const item = response.data.Item
        if (item === undefined) {
          const response = await registUser(payload)
          if (response.status !== 200) throw err
        }
      } catch (error) {
        console.log(error)
        alert(
          'システムエラーが発生しました。しばらく時間をおいてやり直してください',
        )
        router.push('/')
      }
    })()
  }, [])

  return <></>
}

export default IndexPage
