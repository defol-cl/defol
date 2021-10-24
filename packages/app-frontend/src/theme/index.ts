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
    }
  }
};

export const customTheme = createTheme(themeOptions);
