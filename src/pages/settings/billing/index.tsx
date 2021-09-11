import { CustomLoader } from '@/components/common/loader';
import { ContentHeader } from '@/components/molecules/ContentHeader';
import { ProfileContentLink } from '@/components/molecules/ProfileContentLink';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper';
import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext';
import { useCredit } from '@/hooks/useCredit';
import { SettingLayout } from '@/layouts/setting/';
import { UserTypes } from '@/types/global';
// import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import React from 'react';
import styled from 'styled-components';
import CreditSvg from '../../../assets/illustration/credit.svg';

type Props = {
  authUser: any;
  currentUser: UserTypes;
};

const StyledPairCreditSvg = styled(CreditSvg)`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`;

const IndexPage: React.FC<Props> = props => {
  // if (!props.authUser) {
  //   moveToTop();
  //   return <></>;
  // }
  const user = props.currentUser;
  const { credit, isLoading } = useCredit();
  return (
    <SettingLayout
      title={`Kanon Code | クレジットカード情報`}
      currentUser={user}
    >
      {isLoading ? (
        <CustomLoader width={30} height={30} />
      ) : (
        <>
          <Box component='section' pb={5}>
            {credit ? (
              <ContentWrapper>
                <ContentHeader
                  title='Credit Card'
                  description='登録したカード情報でレビューを購入することができます'
                  fontSize={20}
                  marginBottom={1}
                />
                <ProfileContentLink
                  label='クレジットカード'
                  value={credit.customChara}
                  isDivider={false}
                  href='/billing'
                >
                  <IconArrowNext fontSize='large' color='action' />
                </ProfileContentLink>
              </ContentWrapper>
            ) : (
              <NoSettingDataWrapper
                text='クレジットカードを登録する'
                description='
            レビューを購入するにはクレジットカードの登録が必要です。
          '
                href='/billing'
                borderRadius={4}
                mb={6}
              >
                <StyledPairCreditSvg />
              </NoSettingDataWrapper>
            )}
          </Box>
        </>
      )}
    </SettingLayout>
  );
};

export default IndexPage;
