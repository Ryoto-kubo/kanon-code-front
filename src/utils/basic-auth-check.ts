import type { IncomingMessage, ServerResponse } from 'http';
import initializeBasicAuth from 'nextjs-basic-auth';

const users = [
  {
    user: process.env.NEXT_PUBLIC_BASIC_AUTH_USER!,
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD!,
  },
];

const basicAuthCheck = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  await initializeBasicAuth({ users })(req, res);
  // Workaround for major bug: If you cancel, the page loads normally. - https://github.com/jchiatt/nextjs-basic-auth/issues/4
  if (res.statusCode === 401) {
    return;
  }
};

export default basicAuthCheck;
