import { CustomSwitch } from '@/components/atoms/CustomSwitch';
import { CustomLoader } from '@/components/common/loader';
import { ContentHeader } from '@/components/molecules/ContentHeader';
import { LinkGithubButton } from '@/components/molecules/LinkGithubButton';
import { ProfileContentCheck } from '@/components/molecules/ProfileContentCheck';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { useSettingActivity } from '@/hooks/useSettingActivity';
import { SettingLayout } from '@/layouts/setting/';
import { UserTypes } from '@/types/global';
import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

type Props = {
  authUser: any;
  currentUser: UserTypes;
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
  const {
    emailNotices,
    isOpen,
    updatingMessage,
    hasGithubAccessToken,
    isFetch,
    linkToGithub,
    changeOpenedReview,
    changeRequestedReview,
    changeCommentedReview,
  } = useSettingActivity(props.currentUser);

  return (
    <SettingLayout
      title={`Kanon Code | プロフィール`}
      currentUser={props.currentUser}
    >
      <Box component='section' pb={5}>
        <ContentWrapper>
          <ContentHeader
            title='Email Notice'
            description='ONにすることによってKanon Codeをより使いやすく設定できます。'
            fontSize={20}
            marginBottom={1}
          />
          <ProfileContentCheck
            label='レビューが投稿されたとき'
            value={emailNotices!.is_posted_review ? 'ON' : 'OFF'}
            isDivider={true}
          >
            <CustomSwitch
              onChange={changeRequestedReview}
              checked={emailNotices!.is_posted_review}
            />
          </ProfileContentCheck>
          <ProfileContentCheck
            label='レビューが購入されたとき'
            value={emailNotices!.is_opened_review ? 'ON' : 'OFF'}
            isDivider={false}
          >
            <CustomSwitch
              onChange={changeOpenedReview}
              checked={emailNotices!.is_opened_review}
            />
          </ProfileContentCheck>
          <ProfileContentCheck
            label='自身のレビューにコメントされたとき'
            value={emailNotices!.is_commented_review ? 'ON' : 'OFF'}
            isDivider={false}
          >
            <CustomSwitch
              onChange={changeCommentedReview}
              checked={emailNotices!.is_commented_review}
            />
          </ProfileContentCheck>
        </ContentWrapper>
        <ContentWrapper>
          <ContentHeader
            title='Link'
            description='Github連携を行うことでKanon Codeをより使いやすく設定できます。'
            fontSize={20}
            marginBottom={1}
          />
          <ProfileContentCheck
            label='Github連携'
            value={hasGithubAccessToken ? '連携ずみ' : ''}
            isDivider={false}
          >
            <Box position='relative' height='36px'>
              {isFetch ? (
                <Box position='absolute' top='20px' left='-70px'>
                  <CustomLoader width={25} height={25} />
                </Box>
              ) : (
                <LinkGithubButton
                  text={
                    hasGithubAccessToken
                      ? 'Githubと連携ずみ'
                      : 'Githubと連携する'
                  }
                  onClick={linkToGithub}
                />
              )}
            </Box>
          </ProfileContentCheck>
        </ContentWrapper>
        {/* <ContentWrapper>
          <ContentHeader
            title='Delete Account'
            description='アカウントが不要になった場合は削除できます。'
            fontSize={20}
            marginBottom={1}
          />
          <ProfileContentCheck
            label='アカウント削除'
            value=''
            isDivider={false}
          >
            <IconArrowNext fontSize='large' color='action' />
          </ProfileContentCheck>
        </ContentWrapper> */}
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isOpen}
        message={updatingMessage}
      />
    </SettingLayout>
  );
};

export default IndexPage;
