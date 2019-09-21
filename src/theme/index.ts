import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

let theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  palette: {
    primary: {
      light: '#589ffc',
      main: '#3e8ef7',
      dark: '#247cf0',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: '"Muli", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    button: {
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 0
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c'
      }
    }
  }
};

export default theme;
