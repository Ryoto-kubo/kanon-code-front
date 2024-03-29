import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { ErrorView } from '@/components/common/error';
import { CustomLoader } from '@/components/common/loader';
import { MyDrafts } from '@/components/organisms/MyDrafts';
import { useMyDrafts } from '@/hooks/useMyDrafts';
import { LayoutDashboard } from '@/layouts/dashboard';
import { UserTypes } from '@/types/global';
import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import React from 'react';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
  isFetch: boolean;
};

const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return <></>;
  }
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const { data, isValidating } = useMyDrafts();
  const status = data?.data.status;
  if (status === false) {
    return (
      <LayoutDashboard
        title='Kanon Code | ダッシュボード:下書き一覧'
        currentUser={props.currentUser}
      >
        <ErrorView />
      </LayoutDashboard>
    );
  }
  const drafts = data?.data.drafts;
  return (
    <LayoutDashboard
      title='Kanon Code | ダッシュボード:下書き一覧'
      currentUser={props.currentUser}
    >
      <Box width={'100%'} position='relative' minHeight='300px'>
        <CustomHeading2 fontSize={24} marginBottom={1}>
          Drafts
        </CustomHeading2>
        {isValidating ? (
          <CustomLoader width={30} height={30} />
        ) : (
          <Box pb={5}>
            <MyDrafts drafts={drafts} />
          </Box>
        )}
      </Box>
    </LayoutDashboard>
  );
};

export default IndexPage;
