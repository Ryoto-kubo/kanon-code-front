import { ContentHeader } from '@/components/molecules/ContentHeader';
import { ProfileContentLink } from '@/components/molecules/ProfileContentLink';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper';
import { YEARS_EXPERIENCES } from '@/consts/years-experiences';
import { SettingLayout } from '@/layouts/setting/';
import { UserProfileTypes, UserTypes } from '@/types/global';
import { moveToTop } from '@/utils/move-page';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import SkilSvg from '../../../assets/illustration/skil.svg';

type Props = {
  authUser: any;
  currentUser: UserTypes;
};

const StyledPairSkilSvg = styled(SkilSvg)`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`;

const IndexPage: React.FC<Props> = props => {
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const makeInputState = (profile: UserProfileTypes): boolean => {
    const langList = profile.skils.map(el => el.language);
    let isExistData = false;
    for (const value of langList) {
      if (value) {
        isExistData = true;
        return isExistData;
      }
    }
    return isExistData;
  };

  const profile = props.currentUser.user_profile;
  const isInputeState = makeInputState(profile);

  return (
    <SettingLayout
      title={`Kanon Code | スキル`}
      currentUser={props.currentUser}
    >
      <section>
        {isInputeState ? (
          <ContentWrapper>
            <ContentHeader
              title='スキル'
              description='マイページにスキル一覧として表示されます。'
              fontSize={20}
              marginBottom={1}
            />
            {profile.skils.map(
              (el, index) =>
                el.language && (
                  <ProfileContentLink
                    key={uuidv4()}
                    label={el.language}
                    value={YEARS_EXPERIENCES[el.years_experiences].label}
                    isDivider={index === 0 ? false : true}
                    href='/skils'
                  >
                    {''}
                  </ProfileContentLink>
                )
            )}
          </ContentWrapper>
        ) : (
          <NoSettingDataWrapper
            text='スキルを登録する'
            description='スキルはまだ登録されていません。'
            href='/skils'
            borderRadius={4}
            mb={6}
          >
            <StyledPairSkilSvg />
          </NoSettingDataWrapper>
        )}
      </section>
    </SettingLayout>
  );
};

export default IndexPage;
