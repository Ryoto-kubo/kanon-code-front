import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { ErrorView } from '@/components/common/error';
import { CustomLoader } from '@/components/common/loader';
import { MyPaymentsTable } from '@/components/organisms/MyPaymentsTable';
import { useMyPayments } from '@/hooks/useMyPayments';
import { LayoutDashboard } from '@/layouts/dashboard';
import { UserTypes } from '@/types/global';
import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import React from 'react';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
};

const IndexPage: React.FC<Props> = props => {
  if (!props.authUser || !props.currentUser) {
    moveToTop();
    return <></>;
  }
  const { data, isValidating } = useMyPayments();
  const status = data?.data.status;
  if (status === false) {
    return (
      <LayoutDashboard
        title='Kanon Code | ダッシュボード:購入したレビュー'
        currentUser={props.currentUser}
      >
        <ErrorView />
      </LayoutDashboard>
    );
  }

  const posts = data?.data.posts;
  return (
    <LayoutDashboard
      title='Kanon Code | ダッシュボード:購入したレビュー'
      currentUser={props.currentUser}
    >
      <Box width={'100%'} position='relative' minHeight='300px'>
        <CustomHeading2 fontSize={24} marginBottom={1}>
          Payments history
        </CustomHeading2>
        {isValidating ? (
          <CustomLoader width={30} height={30} />
        ) : (
          <Box mt={3}>
            <MyPaymentsTable posts={posts} imgWidth='40px' imgHeight='40px' />
          </Box>
        )}
      </Box>
    </LayoutDashboard>
  );
};

export default IndexPage;
