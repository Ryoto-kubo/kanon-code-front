import { CustomLoader } from '@/components/common/loader';
import { errorMessages } from '@/consts/error-messages';
import { postGithubOAuth } from '@/utils/api/post-github-oauth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const IndexPage: React.FC = () => {
  const router = useRouter();

  const moveToActivity = () => {
    router.push('/settings/activity');
  };

  useEffect(() => {
    (async () => {
      const params = location.search;
      const code = params.split('=')[1];
      if (!code) {
        alert(errorMessages.INVAILD_ACTION);
        moveToActivity();
        return;
      }
      try {
        await postGithubOAuth({ code });
      } catch (error) {
        alert(errorMessages.SYSTEM_ERROR);
      } finally {
        moveToActivity();
      }
    })();
  }, []);

  return <CustomLoader />;
};

export default IndexPage;
