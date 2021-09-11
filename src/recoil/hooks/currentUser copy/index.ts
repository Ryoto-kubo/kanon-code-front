import { RecoilAtomKeys } from '@/recoil/recoil-keys';
import { UserTypes } from '@/types/global';
import { atom, useRecoilState } from 'recoil';

const currentUserState = atom<UserTypes | null>({
  key: RecoilAtomKeys.CURRENT_USER,
  default: null,
});

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  return { currentUser, setCurrentUser };
};
