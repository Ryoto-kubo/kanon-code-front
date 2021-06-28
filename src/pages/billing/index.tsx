import { CustomSolidButton } from '@/components/atoms/SolidButton'
import { CustomLoader } from '@/components/common/loader'
import { ValidMessage } from '@/components/molecules/ValidMessage'
import { SettingForm } from '@/components/organisms/SettingForm'
import { messages } from '@/consts/messages'
import { useCredit } from '@/hooks/useCredit'
import { SettingLayout } from '@/layouts/setting-form'
import { UserTypes } from '@/types/global'
import { postCredit } from '@/utils/api/post-credit'
import { postRegisterCustomer } from '@/utils/api/post-register-customer'
import { getStripe } from '@/utils/stripe'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Snackbar from '@material-ui/core/Snackbar'
import { fade } from '@material-ui/core/styles'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import stripeJs from '@stripe/stripe-js'
import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  authUser: any
  currentUser: UserTypes | null
}

const StyledBox = styled(Box)(
  ({ theme }) => `
    width: 100%;
    margin: auto;
    margin-bottom: 32px;
    max-width: 600px;
    padding: 16px;
    background: ${fade(theme.palette.primary.main, 0.1)};
  `,
)
const StyledBoxBgColorWhite = styled(Box)`
  background: #ffffff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
`

const Wrapper = ({
  authUser,
  currentUser,
}: {
  authUser: any
  currentUser: UserTypes | null
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isOpen, setIsOpen] = useState(false)
  const [updatingMessage, setUpdatingMessage] = useState('更新中...')
  const [isDisabled, setIsDidabled] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(true)
  const userId = authUser.username
  const { credit, isLoading } = useCredit(userId)

  const changeNumber = (event: stripeJs.StripeCardElementChangeEvent) => {
    const empty = event.empty
    const complete = event.complete
    if (empty) {
      setIsDidabled(true)
      setIsValid(true)
      return
    }
    if (complete) {
      setIsDidabled(false)
      setIsValid(true)
    } else {
      setIsDidabled(true)
      setIsValid(false)
    }
  }

  const postConfirm = () => {
    let lsResult = true
    if (credit) {
      lsResult = confirm(
        '登録されているカード情報は上書きされます。よろしいですか？',
      )
    }
    return lsResult
  }

  const update = async () => {
    if (!isValid) return
    if (!stripe || !elements) return
    const cardElement = elements.getElement(CardElement)
    const { token, error } = await stripe.createToken(cardElement!)
    if (error || !token) {
      setIsDidabled(true)
      setIsValid(false)
      return
    }
    const isConfirm = postConfirm()
    if (!isConfirm) return
    setIsOpen(true)
    const err = new Error()
    const last4Chara = token.card!.last4
    try {
      const responseCustomer = await postRegisterCustomer(userId)
      console.log(responseCustomer, 'responseCustomer')
      if (!responseCustomer.data.status) throw err
      const customerId = responseCustomer.data.customer
      const clientSecret = responseCustomer.data.client_secret
      if (!clientSecret) return
      const resultSetup = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: userId,
          },
        },
      })
      console.log(resultSetup, 'resultSetup')
      if (resultSetup.setupIntent?.status !== 'succeeded') throw err
      const setUpClientSecret = resultSetup.setupIntent?.client_secret!
      const setUpId = resultSetup.setupIntent?.id
      const setUpMethod = resultSetup.setupIntent?.payment_method!
      const params = {
        userId,
        customerId,
        last4Chara,
        setUpClientSecret,
        setUpId,
        setUpMethod,
      }
      const response = await postCredit(params)
      console.log(response, 'response')

      const result = response.data
      if (!result.status) throw err
      setUpdatingMessage(messages.UPDATED_MESSAGE)
    } catch {
      setIsOpen(false)
    }
  }

  return (
    <SettingLayout
      title="Kanon Code | カード情報設定"
      currentUser={currentUser}
    >
      <SettingForm
        linkText="Credit"
        href="/settings/billing"
        fontSize="default"
        color="inherit"
        headingFontSize={24}
        marginBottom={0}
      >
        {isLoading ? (
          <CustomLoader width={30} height={30} />
        ) : (
          <Box textAlign="center">
            <StyledBox>
              <StyledBoxBgColorWhite>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                        backgroundColor: '#ffffff',
                      },
                      invalid: {
                        color: '#EA4335',
                      },
                    },
                  }}
                  onChange={changeNumber}
                />
              </StyledBoxBgColorWhite>
              {!isValid && (
                <ValidMessage validText="入力された番号は無効です" />
              )}
              <List disablePadding>
                <ListItem disableGutters dense>
                  ・カード情報をStripeにのみ送信・保存されます
                </ListItem>
                <ListItem disableGutters dense>
                  ・レビュワーのユーザー名を知ることができます
                </ListItem>
                <ListItem disableGutters dense>
                  ・お支払いに関するQ＆A
                </ListItem>
              </List>
            </StyledBox>
            <CustomSolidButton
              sizing="small"
              onClick={update}
              disabled={isDisabled}
            >
              登録
            </CustomSolidButton>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={isOpen}
              message={updatingMessage}
            />
          </Box>
        )}
      </SettingForm>
    </SettingLayout>
  )
}

const IndexPage = (props: Props) => {
  const promiseStripe = getStripe()

  return (
    <Elements stripe={promiseStripe}>
      <Wrapper {...props} />
    </Elements>
  )
}

export default IndexPage
