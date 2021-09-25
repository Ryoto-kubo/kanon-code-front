import { CustomSwitch } from '@/components/atoms/CustomSwitch';
import { ContentHeader } from '@/components/molecules/ContentHeader';
// import { LinkGithubButton } from '@/components/molecules/LinkGithubButton';
import { ProfileContentCheck } from '@/components/molecules/ProfileContentCheck';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
// import { IconArrowNext } from '@/components/svg/materialIcons/IconArrowNext';
import { errorMessages } from '@/consts/error-messages';
import { messages } from '@/consts/messages';
import { SettingLayout } from '@/layouts/setting/';
import { EmailNoticesTypes, UserTypes } from '@/types/global';
import { postEmailNotices } from '@/utils/api/post-email-notices';
import { moveToTop } from '@/utils/move-page';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useState } from 'react';

type Props = {
  authUser: any;
  currentUser: UserTypes;
  isFetch: boolean;
};
type EmailNoticesKeyTypes = Readonly<
  'is_opened_review' | 'is_posted_review' | 'is_commented_review'
>;

const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return <></>;
  }
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const [emailNotices, setEmailNotices] = useState<EmailNoticesTypes | null>(
    props.currentUser.email_notices
  );
  const [isOpen, setIsOpen] = useState(false);
  const [updatingMessage, setUpdatingMessage] = useState('更新中...');

  const resetUpdatingMessage = () => {
    setUpdatingMessage('更新中...');
  };

  const updateEmailNotices = async (
    key: EmailNoticesKeyTypes,
    value: boolean
  ) => {
    setUpdatingMessage;
    emailNotices![key] = value;
    const params = {
      emailNotices: emailNotices!,
    };
    const err = new Error();
    try {
      setUpdatingMessage(messages.UPDATED_MESSAGE);
      const result = await postEmailNotices(params);
      if (!result.data.status) throw err;
      setIsOpen(false);
    } catch (error) {
      alert(errorMessages.SYSTEM_ERROR);
      setIsOpen(false);
    }
  };

  const changeOpenedReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setEmailNotices({ ...emailNotices!, is_opened_review: isChecked });
    resetUpdatingMessage();
    setIsOpen(true);
    updateEmailNotices('is_opened_review', isChecked);
  };

  const changeRequestedReview = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.currentTarget.checked;
    setEmailNotices({ ...emailNotices!, is_posted_review: isChecked });
    resetUpdatingMessage();
    setIsOpen(true);
    updateEmailNotices('is_posted_review', isChecked);
  };

  const changeCommentedReview = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.currentTarget.checked;
    setEmailNotices({ ...emailNotices!, is_commented_review: isChecked });
    resetUpdatingMessage();
    setIsOpen(true);
    updateEmailNotices('is_commented_review', isChecked);
  };

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
        {/* <ContentWrapper>
          <ContentHeader
            title='Link'
            description='Github連携を行うことでKanon Codeをより使いやすく設定できます。'
            fontSize={20}
            marginBottom={1}
          />
          <ProfileContentCheck
            label='Github連携'
            value={false ? 'ON' : 'OFF'}
            isDivider={false}
          >
            <LinkGithubButton onClick={linkOnGithub} />
          </ProfileContentCheck>
        </ContentWrapper> */}
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
