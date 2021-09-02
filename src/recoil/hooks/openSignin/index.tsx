import { RecoilAtomKeys } from '@/recoil/recoil-keys';
// import React from 'react';
import { atom, useRecoilState } from 'recoil';

// 煩雑にはなるがatomを直接呼び出せないようにするためにやってみる
// 参考記事：https://engineering.linecorp.com/ja/blog/line-sec-frontend-using-recoil-to-get-a-safe-and-comfortable-state-management/
const isOpenSigninState = atom({
  key: RecoilAtomKeys.IS_OPEN_SIGNIN_STATE,
  default: false,
});

export const useIsOpenSignin = () => {
  const [isOpenSignin, setIsOpenSignin] = useRecoilState(isOpenSigninState);
  return { isOpenSignin, setIsOpenSignin };
};
