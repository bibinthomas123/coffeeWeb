import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
// hooks

//
import palette from "./palette";

import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeProvider({ children }) {
  const isLight = true;

  const themeOptions = useMemo(
    () => ({
      palette: palette.light,
      shape: { borderRadius: 8 },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
      typography: {
        fontFamily: ["Fauna One", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
          fontFamily: ["Cinzel", "sans-serif"].join(","),
          fontSize: 48,
        },
        h2: {
          fontFamily: ["Cinzel", "sans-serif"].join(","),
          fontSize: 36,
        },
        h3: {
          fontFamily: ["Cinzel", "sans-serif"].join(","),
          fontSize: 20,
        },
        h4: {
          fontFamily: ["Cinzel", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
