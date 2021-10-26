import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#00BCD4',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#FFC107',
    },
    success: {
      main: '#009688',
      contrastText: '#FFF'
    },
    warning: {
      main: '#FFC107'
    },
    info: {
      main: '#3F51B5'
    },
    error: {
      main: '#E91E63'
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: {
          my: 1
        }
      }
    },
    MuiToggleButtonGroup: {
      defaultProps: {
      
      }
    },
    MuiToggleButton: {
      defaultProps: {
        sx: {
          px: 3
        }
      }
    }
  }
};

export const customTheme = createTheme(themeOptions);
