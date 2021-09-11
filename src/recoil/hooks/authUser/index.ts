import { RecoilAtomKeys } from '@/recoil/recoil-keys';
import { CognitoUser } from '@aws-amplify/auth';
import { atom, useRecoilState } from 'recoil';

const authUserState = atom<CognitoUser | null>({
  key: RecoilAtomKeys.AUTH_USER,
  default: null,
});

export const useAuthUser = () => {
  const [authUser, setAuthUser] = useRecoilState(authUserState);
  return { authUser, setAuthUser };
};
