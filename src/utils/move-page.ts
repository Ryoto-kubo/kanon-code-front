import { useRouter } from 'next/router';

export const moveToTop = () => {
  const router = useRouter();
  router.push('/');
};
