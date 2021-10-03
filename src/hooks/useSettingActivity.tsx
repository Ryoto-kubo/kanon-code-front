import { errorMessages } from '@/consts/error-messages';
import { messages } from '@/consts/messages';
import { EmailNoticesTypes, UserTypes } from '@/types/global';
import { getGithubAccessToken } from '@/utils/api/get-github-oauth';
import { postEmailNotices } from '@/utils/api/post-email-notices';
import { useEffect, useState } from 'react';

type EmailNoticesKeyTypes = Readonly<
  'is_opened_review' | 'is_posted_review' | 'is_commented_review'
>;

export const useSettingActivity = (currentUser: UserTypes) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const [emailNotices, setEmailNotices] = useState<EmailNoticesTypes | null>(
    currentUser.email_notices
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [updatingMessage, setUpdatingMessage] = useState('更新中...');
  const [hasGithubAccessToken, setHasGithubAccessToken] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await getGithubAccessToken();
        const accessToken = result.data.access_token;
        const hasAccessToken = accessToken !== undefined && accessToken !== '';
        setHasGithubAccessToken(hasAccessToken);
        setIsFetch(false);
      } catch {
        alert(errorMessages.SYSTEM_ERROR);
      }
    })();
  });

  const linkToGithub = () => {
    if (hasGithubAccessToken) return;
    location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo`;
  };

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

  return {
    emailNotices,
    isOpen,
    updatingMessage,
    hasGithubAccessToken,
    isFetch,
    linkToGithub,
    changeOpenedReview,
    changeRequestedReview,
    changeCommentedReview,
  };
};
