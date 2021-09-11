import { RecoilAtomKeys } from '@/recoil/recoil-keys';
import { atom, useRecoilState } from 'recoil';

const isReviewAcceptState = atom({
  key: RecoilAtomKeys.REVIEW_ACCSEPT,
  default: false,
});

export const useIsReviewAccept = () => {
  const [isReviewAccept, setIsReviewAccept] = useRecoilState(
    isReviewAcceptState
  );
  return { isReviewAccept, setIsReviewAccept };
};
