import * as gtag from '@/utils/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function usePageView() {
  const router = useRouter();
  useEffect(() => {
    if (!gtag.existsGaId) {
      return;
    }

    const handleRouteChange = (path: string, { shallow }: any) => {
      if (!shallow) {
        gtag.pageview(path);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
