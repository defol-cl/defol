import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#9C27B0',
    },
    secondary: {
      main: '#FF4081',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: {
          my: 1
        }
      }
    },
    MuiCard: {
      defaultProps: {
        sx: {
          my: 3
        },
        elevation: 4
      },
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        sx: {
          mr: 2
        }
      }
    }
  }
};

export const customTheme = createTheme(themeOptions);
