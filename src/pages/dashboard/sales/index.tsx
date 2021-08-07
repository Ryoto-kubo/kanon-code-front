import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { ErrorView } from '@/components/common/error';
import { CustomLoader } from '@/components/common/loader';
import { MySales } from '@/components/organisms/MySales';
import { SalesArea } from '@/components/organisms/SalesArea';
import { SalesChart } from '@/components/organisms/SalesChart';
import { DepositDialog } from '@/components/parts/depositDialog';
import { useSales } from '@/hooks/useSales';
import { LayoutDashboard } from '@/layouts/dashboard';
import { UserTypes } from '@/types/global';
import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
};

const IndexPage: React.FC<Props> = props => {
  if (!props.authUser || !props.currentUser) {
    moveToTop();
    return <></>;
  }
  const [isOpen, setIsOpen] = useState(false);
  const { data, isValidating } = useSales();
  const status = data?.data.status;
  if (status === false) {
    return (
      <LayoutDashboard
        title='Kanon Code | ダッシュボード:売り上げ'
        currentUser={props.currentUser}
      >
        <ErrorView />
      </LayoutDashboard>
    );
  }
  const sales = data?.data.sales;
  const totalSales = data?.data.totalSales;
  const currentTotalSales = data?.data.currentTotalSales;
  const labels = data?.data.labels;
  const salesList = data?.data.salesList;
  const backGrounds = data?.data.backGrounds;
  return (
    <LayoutDashboard
      title='Kanon Code | ダッシュボード:売り上げ'
      currentUser={props.currentUser}
    >
      <Box width={'100%'} position='relative' minHeight='300px'>
        <CustomHeading2 fontSize={24} marginBottom={1}>
          Sales
        </CustomHeading2>
        {isValidating ? (
          <CustomLoader width={30} height={30} />
        ) : (
          <>
            <Box my={3}>
              <Box mb={2} textAlign='right'>
                <CustomSolidButton
                  sizing='small'
                  color='primary'
                  onClick={() => setIsOpen(true)}
                >
                  出金申請
                </CustomSolidButton>
              </Box>
              <Box mb={5}>
                <MySales sales={sales} imgWidth='40px' imgHeight='40px' />
              </Box>
              <Box mb={2}>
                <SalesArea
                  totalSales={totalSales}
                  currentTotalSales={currentTotalSales}
                />
              </Box>
              <SalesChart
                labels={labels}
                salesList={salesList}
                backGrounds={backGrounds}
              />
            </Box>
            <DepositDialog
              isOpenDialog={isOpen}
              closeDialog={() => setIsOpen(false)}
              totalSales={totalSales}
            />
          </>
        )}
      </Box>
    </LayoutDashboard>
  );
};

export default IndexPage;
