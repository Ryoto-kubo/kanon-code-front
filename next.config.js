const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
module.exports = withCss(
  withSass({
    // async rewrites() {
    //   return [
    //     {
    //       source: "/api/:slug*",
    //       destination: `http://127.0.0.1:3000/api/:slug*`, // Proxy to Backend
    //     },
    //   ];
    // },
  })
);
