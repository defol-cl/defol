import { createTheme } from "@mui/material/styles";

const borderColor = '#bae5d9';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a2342',
    },
    secondary: {
      main: '#2ca58d',
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
        divider: {
          borderColor: borderColor
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          marginRight: 8
        }
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
}
);

export { customTheme };
