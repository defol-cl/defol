import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

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
}
);

export { customTheme };
