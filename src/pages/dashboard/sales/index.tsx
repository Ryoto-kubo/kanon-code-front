import { CustomHeading2 } from '@/components/atoms/CustomHeading2'
import { ErrorView } from '@/components/common/error'
import { CustomLoader } from '@/components/common/loader'
import { MySales } from '@/components/organisms/MySales'
import { SalesArea } from '@/components/organisms/SalesArea'
import { useSales } from '@/hooks/useSales'
import { LayoutDashboard } from '@/layouts/dashboard'
import { UserTypes } from '@/types/global'
import Box from '@material-ui/core/Box'
import React from 'react'

type Props = {
  authUser: any
  currentUser: UserTypes | null
}

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser || !props.currentUser) return <></>
  const { data, isValidating } = useSales()
  const status = data?.data.status
  if (status === false) {
    return (
      <LayoutDashboard
        title="Kanon Code | ダッシュボード:売り上げ"
        currentUser={props.currentUser}
      >
        <ErrorView />
      </LayoutDashboard>
    )
  }
  const sales = data?.data.sales
  const totalPrice = data?.data.totalPrice
  return (
    <LayoutDashboard
      title="Kanon Code | ダッシュボード:売り上げ"
      currentUser={props.currentUser}
    >
      <Box width={'100%'} position="relative" minHeight="300px">
        <CustomHeading2 fontSize={24} marginBottom={1}>
          Sales
        </CustomHeading2>
        {isValidating ? (
          <CustomLoader width={30} height={30} />
        ) : (
          <Box mt={3}>
            <Box mb={2}>
              <MySales sales={sales} imgWidth="40px" imgHeight="40px" />
            </Box>
            <SalesArea totalPrice={totalPrice} />
          </Box>
        )}
      </Box>
    </LayoutDashboard>
  )
}

export default IndexPage
