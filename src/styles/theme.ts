import { createMuiTheme } from '@material-ui/core'
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8e99f3',
      main: '#5C6BC0',
      dark: '#26418f',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff8a99',
      main: '#EC576B',
      dark: '#b41f40',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#202020',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  // overrides: {
  //   // Style sheet name ⚛️
  //   MuiContainer: {
  //     // Name of the rule
  //     root: {
  //       // Some CSS
  //       padding: 0,
  //     },
  //   },
  // },
})
export default theme
