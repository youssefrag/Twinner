import React from "react";
import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import MainTheme from "./theme";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <Navbar />
      </ThemeProvider>
    </div>
  );
}

export default App;
