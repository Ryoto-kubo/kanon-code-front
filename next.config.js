const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
module.exports = withCss(
  withSass({
    async rewrites() {
      return [
        {
          source: "/hello",
          destination: "http://127.0.0.1:3000/hello", // Proxy to Backend
        },
      ];
    },
  })
);
