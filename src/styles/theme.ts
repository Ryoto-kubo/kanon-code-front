import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
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
      fontSize: '48px',
      // '@media (min-width:600px)': {
      //   fontSize: '32px',
      // },
    },
    button: {
      textTransform: 'none',
    },
  },
  // overrides: {
  //   // Style sheet name ⚛️
  //   MuiAvatar: {
  //     // Name of the rule
  //     root: {
  //       // Some CSS
  //       width: '100%',
  //       height: '100%',
  //     },
  //   },
  // },
})
export default responsiveFontSizes(theme)
