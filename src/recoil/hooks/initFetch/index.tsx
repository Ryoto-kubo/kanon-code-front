import { RecoilAtomKeys } from '@/recoil/recoil-keys';
import { atom, useRecoilState } from 'recoil';

const initFetchState = atom({
  key: RecoilAtomKeys.INIT_FETCH,
  default: false,
});

export const useIsInitFetch = () => {
  const [isInitFetch, setIsInitFetch] = useRecoilState(initFetchState);
  return { isInitFetch, setIsInitFetch };
};
