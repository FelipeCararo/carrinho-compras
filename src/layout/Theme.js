import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#36914d',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#36914d',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
