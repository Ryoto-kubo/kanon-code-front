import { CustomLoader } from '@/components/common/loader';
import { errorMessages } from '@/consts/error-messages';
import { getUser } from '@/utils/api/get-user';
import { postRegist } from '@/utils/api/post-register';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const moveToRegister = () => {
    router.push('/register');
  };
  const moveToTop = () => {
    router.push('/');
  };

  useEffect(() => {
    const err = new Error();
    (async () => {
      try {
        const response = await getUser();
        if (response.status !== 200) throw err;
        const item = response.data.Item;
        if (item === undefined) {
          // ユーザー未登録
          const response = await postRegist();
          if (response.status !== 200) throw err;
          moveToRegister();
        } else {
          // ユーザーとして登録済み
          if (item.user_profile.display_name === '') {
            moveToRegister();
          } else {
            moveToTop();
          }
        }
      } catch (error) {
        alert(errorMessages.SYSTEM_ERROR);
        moveToTop();
      }
    })();
  }, []);

  return (
    <>
      <CustomLoader />
    </>
  );
};

export default IndexPage;
