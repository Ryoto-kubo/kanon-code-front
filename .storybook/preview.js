import theme from "@/styles/theme";
import { muiTheme } from "storybook-addon-material-ui";

export const decorators = [muiTheme([theme])];

const addParameters = require("@storybook/react").addParameters;
addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
});
