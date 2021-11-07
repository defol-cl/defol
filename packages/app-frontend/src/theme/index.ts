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
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e3cce8'
        }
      }
    },
    MuiCard: {
      defaultProps: {
        sx: {
          my: 3
        },
        elevation: 0
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e3cce8'
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        sx: {
          mr: 2
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        divider: {
          borderColor: '#e3cce8'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          marginRight: 8
        }
      }
    }
  }
};

export const customTheme = createTheme(themeOptions);
