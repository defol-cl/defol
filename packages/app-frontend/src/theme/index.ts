import { createTheme } from "@mui/material/styles";
import { alpha } from '@mui/material/styles';

const borderColor = '#abd3ff';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#2196f3',
    }
  }
});

const customTheme = createTheme(theme, {
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
          borderColor: borderColor
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
          borderColor: borderColor
        },
        
      }
    },
    MuiCardHeader: {
      defaultProps: {
        sx: {
          mr: 2
        }
      },
      styleOverrides: {
        title: {
          color: theme.palette.secondary.main
        },
        subheader: {
          color: theme.palette.text.secondary
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.secondary.light, 0.14),
          }
        },
        divider: {
          borderColor: borderColor
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          marginRight: 8
        }
      }
    }
  }
});

export { customTheme };
