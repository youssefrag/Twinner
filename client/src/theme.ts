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
    navSubHeading: React.CSSProperties;
    mainSubHeading: React.CSSProperties;
    switchPage: React.CSSProperties;
    displayName: React.CSSProperties;
    characterCount: React.CSSProperties;
    mainSecondary: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    logo?: React.CSSProperties;
    navSubHeading?: React.CSSProperties;
    mainSubHeading: React.CSSProperties;
    switchPage: React.CSSProperties;
    displayName: React.CSSProperties;
    characterCount: React.CSSProperties;
    addTags: React.CSSProperties;
    mainSecondary: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
    navSubHeading: true;
    mainSubHeading: true;
    switchPage: true;
    displayName: true;
    characterCount: true;
    addTags: true;
    mainSecondary: true;
  }
}

const MainTheme = createTheme({
  palette: {
    primary: {
      main: "#7950f2",
      dark: "#302061",
      light: "#e4dcfc",
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
      fontSize: "2.4rem",
      color: "#fff",
    },
    navSubHeading: {
      fontSize: "2rem",
      color: "#fff",
    },
    mainSubHeading: {
      fontFamily: "Lato, sans-serif",
      fontSize: "2.8rem",
      color: "#302061",
      fontWeight: 700,
    },
    switchPage: {
      fontFamily: "Lato, sans-serif",
      fontSize: "1.2rem",
      color: "#302061",
      cursor: "pointer",
    },
    displayName: {
      color: "#fff",
      fontSize: "1.2rem",
    },
    characterCount: {
      color: "#302061",
    },
    addTags: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "#302061",
    },
    mainSecondary: {
      fontFamily: "Lato, sans-serif",
      fontSize: "1.8rem",
      color: "#302061",
      fontWeight: 600,
    },
  },
  spacing: [2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160],
});

export default MainTheme;
