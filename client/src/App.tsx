import React, { useState, useEffect } from "react";
import "./App.css";

import { UserContextProvider } from "./context/UserContext";

import Cookies from "js-cookie";

import { ThemeProvider } from "@mui/material/styles";
import MainTheme from "./theme";

import Navbar from "./components/Navbar";

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const userId = Cookies.get("userId");
  const name = Cookies.get("name");
  const email = Cookies.get("email");

  useEffect(() => {
    if (userId) {
      setUserLoggedIn(true);
    }
  }, [userId]);

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <UserContextProvider
          name={name}
          email={email}
          userId={userId}
          isUserLoggedIn={isUserLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
        >
          <Navbar />
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
