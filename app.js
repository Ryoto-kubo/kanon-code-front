const protect = require('static-auth');
const safeCompare = require('safe-compare');

const app = protect(
  '/',
  (username, password) =>
    safeCompare(username, process.env.NEXT_PUBLIC_BASIC_AUTH_USER || 'admin') &&
    safeCompare(
      password,
      process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD || 'admin'
    ),
  {
    directory: `${__dirname}/public`,
    onAuthFailed: res => {
      res.end('Authentication failed');
    },
  }
);

module.exports = app;
