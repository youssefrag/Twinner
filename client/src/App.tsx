import React, { useState, useEffect } from "react";
import "./App.css";

import Cookies from "js-cookie";

// import { UserContext } from "./context/userContext";
// import { UserContextProvider } from "./context/userContext";

import { ThemeProvider } from "@mui/material/styles";
import MainTheme from "./theme";

import Navbar from "./components/Navbar";

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const userId = Cookies.get("user");

  useEffect(() => {
    if (userId) {
      setUserLoggedIn(true);
    }
  }, [userId]);

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <Navbar />
      </ThemeProvider>
    </div>
  );
}

export default App;
