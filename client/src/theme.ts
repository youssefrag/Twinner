import { createTheme } from "@mui/material/styles";

declare module "@mui/material" {
  interface Color {
    dark: string;
    main: string;
    light: string;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    logo: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
    h3: false;
  }
}

const MainTheme = createTheme({
  palette: {
    primary: {
      main: "#7950f2",
      dark: "#302061",
      light: "#d0bfff",
    },
    grey: {
      main: "#212529",
      light: "#ced4da",
    },
  },
  typography: {
    htmlFontSize: 10,
    allVariants: {
      fontFamily: "Lato, sans-serif",
    },
    logo: {
      fontSize: "2rem",
      color: "#fff",
    },
  },
  spacing: [2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160],
});

export default MainTheme;
