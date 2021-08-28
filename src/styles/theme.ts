import { createTheme, responsiveFontSizes } from '@material-ui/core';
const theme = createTheme({
  palette: {
    common: {
      black: '#202124',
    },
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
      primary: '#202124',
    },
    error: {
      main: '#ff604f',
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
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        margin: '0',
      },
    },
  },
});
export default responsiveFontSizes(theme);
