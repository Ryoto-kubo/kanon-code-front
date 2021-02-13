import { createMuiTheme } from "@material-ui/core";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8e99f3",
      main: "#5C6BC0",
      dark: "#26418f",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff8a99",
      main: "#EC576B",
      dark: "#b41f40",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
    },
  },
});
export default theme;
