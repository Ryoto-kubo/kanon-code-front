import '@/aws/cognito/config'
import { CustomNprogress } from '@/components/common/nextNprogress'
import { apis } from '@/consts/api/'
import { UserType } from '@/consts/type'
// import { useRequireLogin } from "@/hooks/useRequireLogin";
import { SettingLayout } from '@/layouts/setting'
import Layout from '@/layouts/standard'
import theme from '@/styles/theme'
import { axios } from '@/utils/axios'
import { CognitoUser } from '@aws-amplify/auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/styles'
import { Auth } from 'aws-amplify'
import 'modern-css-reset/dist/reset.min.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'nprogress/nprogress.css' // バーのデフォルトスタイルのインポート
import React, { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'

type ParamsType = {
  userId: string
}

const StyledWrapper = styled.div`
  background: #ffffff;
  position: relative;
  min-height: 100vh;
  padding-bottom: 572px;
  box-sizing: border-box;
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding-bottom: 223px;
  }
`

const getUser = async (params: ParamsType) => {
  return await axios.get(apis.GET_USER, { params })
}

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  const [authUser, setAuthUser] = useState<CognitoUser | null>(null)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [isFetch, setisFetch] = useState<boolean>(false)
  const layout = pageProps.layout
  const title = pageProps.title
  const err = new Error()
  console.log('_app.tsx')
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    ;(async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser()
        const payload = authenticatedUser.signInUserSession.idToken.payload
        const params = {
          userId: payload['cognito:username'],
        }
        const response = await getUser(params)
        if (response.status !== 200) throw err
        const user = response.data.Item
        setAuthUser(authenticatedUser)
        setCurrentUser(user)
        setisFetch(true)
      } catch {
        setAuthUser(null)
        setCurrentUser(null)
        setisFetch(true)
        if (router.pathname === '/' || router.pathname === '/signin') return
        router.push('/')
      }
    })()
  }, [])

  const getLayout = () => {
    switch (layout) {
      case 'SettingLayout':
        return (
          <SettingLayout
            title={`Kanon Code | ${title}`}
            currentUser={currentUser}
          >
            <CustomNprogress />
            <Component {...pageProps} authUser={authUser} />
          </SettingLayout>
        )
      case 'Layout':
        return (
          <Layout title={`Kanon Code | ${title}`} currentUser={currentUser}>
            <CustomNprogress />
            <Component {...pageProps} currentUser={currentUser} />
          </Layout>
        )
      default:
        return (
          <>
            <CustomNprogress />
            <Component
              {...pageProps}
              authUser={authUser}
              currentUser={currentUser}
            />
          </>
        )
    }
  }

  if (!isFetch) return <></>
  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <Head>
              <meta
                name="viewport"
                content="width=device-width,height=device-height"
                key="viewport"
              />
            </Head>
            <CssBaseline />
            <StyledWrapper>
              {/* <Component {...pageProps} authUser={authUser} /> */}
              {getLayout()}
            </StyledWrapper>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  )
}

export default MyApp
