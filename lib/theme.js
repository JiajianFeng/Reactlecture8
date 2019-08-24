import { createMuiTheme } from '@material-ui/core/styles';
import { grey, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#C53801',
      main: '#B43301',
      dark: '#A32E01'
    },
    secondary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700]
    },
    action: {
      light: grey[300],
      main: grey[500],
      dark: grey[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
