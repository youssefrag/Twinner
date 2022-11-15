import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import EmailAlreadyExists from "../messages/EmailAlreadyExists";
import MissingField from "../messages/MissingField";
import EmailDoesNotExist from "../messages/EmailDoesNotExist";
import PasswordsNotMatching from "../messages/PasswordsNotMatching";

import Cookies from "js-cookie";

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import PasswordIncorrect from "../messages/PasswordIncorrect";

import useWindowDimensions from "./useWindowDimensions";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  fontSize: "1rem",
  padding: "0.5rem 1.2rem",
  color: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: "90%",
  backgroundColor: theme.palette.primary.dark,
  fontSize: "1.4rem",
  padding: "0.5rem 1.2rem",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
    color: theme.palette.primary.dark,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90%",
  "& .MuiOutlinedInput-root": {
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  bgcolor: "#f2eefe",
  boxShadow: 24,
  p: 4,
  borderRadius: "30px",
  padding: "4rem",
};

const mediumModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "12rem",
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "30px",
  padding: "4rem",
};

type Alerts = {
  emailAlreadyExists: boolean;
  missingField: boolean;
  emailDoesNotExist: boolean;
  passwordsNotMatching: boolean;
  passwordIncorrect: boolean;
};

const LoginRegister = () => {
  const { height, width } = useWindowDimensions();

  const userContext = useContext(UserContext);

  const [alerts, setAlerts] = useState<Alerts>({
    emailAlreadyExists: false,
    missingField: false,
    emailDoesNotExist: false,
    passwordsNotMatching: false,
    passwordIncorrect: false,
  });

  const resetAlerts = () => {
    setAlerts({
      emailAlreadyExists: false,
      missingField: false,
      emailDoesNotExist: false,
      passwordsNotMatching: false,
      passwordIncorrect: false,
    });
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [page, setPage] = useState<string>("login");

  const switchPage = () => {
    resetAlerts();
    if (page === "login") {
      setUserLogin(null);
      setPage("register");
    } else if (page === "register") {
      setUserRegister(null);
      setPage("login");
    }
  };

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setUserLogin(null);
    setUserRegister(null);
    resetAlerts();
    setOpenModal(false);
  };

  // Handle login data

  interface LoginData {
    email: string;
    password: string;
  }

  const [userLogin, setUserLogin] = useState<LoginData>(null);

  const handleLoginChange = (e: React.FormEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    const name = element.name;
    setUserLogin((prev) => ({ ...userLogin, [name]: value || "" }));
  };

  const handleLoginSubmit = async () => {
    resetAlerts();
    if (userLogin === null) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: true,
        emailDoesNotExist: false,
        passwordsNotMatching: false,
        passwordIncorrect: false,
      });
      return;
    }
    const { email, password } = userLogin;
    if (!email || !password) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: true,
        emailDoesNotExist: false,
        passwordsNotMatching: false,
        passwordIncorrect: false,
      });
      return;
    }
    let response = await fetch(`/profile/${userLogin.email}`, {
      method: "GET",
    });
    let result = await response.json();
    const userDataDB = result.rows[0];
    if (!userDataDB) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: false,
        emailDoesNotExist: true,
        passwordsNotMatching: false,
        passwordIncorrect: false,
      });
      return;
    }
    if (password !== userDataDB.password) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: false,
        emailDoesNotExist: false,
        passwordsNotMatching: false,
        passwordIncorrect: true,
      });
      return;
    }
    userContext.setUser({
      userId: userDataDB.id,
      name: userDataDB.name,
      email: userDataDB.email,
    });
    userContext.setUserLoggedIn(true);
    Cookies.set("userId", userDataDB.id);
    Cookies.set("name", userDataDB.name);
    Cookies.set("email", userDataDB.email);
  };

  // Handle register data

  interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [userRegister, setUserRegister] = useState<RegisterData>(null);

  const handleRegisterChange = (e: React.FormEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    const name = element.name;
    setUserRegister((prev) => ({ ...userRegister, [name]: value || "" }));
  };

  const handleRegisterSubmit = async () => {
    if (userRegister === null) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: true,
        emailDoesNotExist: false,
        passwordsNotMatching: false,
        passwordIncorrect: false,
      });
      return;
    }
    const { name, email, password, confirmPassword } = userRegister;
    if (!name || !email || !password || !confirmPassword) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: true,
        emailDoesNotExist: false,
        passwordsNotMatching: false,
        passwordIncorrect: false,
      });
      return;
    } else if (password !== confirmPassword) {
      setAlerts({
        emailAlreadyExists: false,
        missingField: false,
        emailDoesNotExist: false,
        passwordsNotMatching: true,
        passwordIncorrect: false,
      });
      return;
    }
    let response = await fetch("/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    });
    let result = await response.json();
    if (
      result ===
      'duplicate key value violates unique constraint "profile_email_key"'
    ) {
      setAlerts({
        emailAlreadyExists: true,
        missingField: false,
        emailDoesNotExist: false,
        passwordsNotMatching: false,
        passwordIncorrect: false,
      });
      return;
    }
    const userDataDB = result.rows[0];
    userContext.setUser({
      userId: userDataDB.id,
      name: userDataDB.name,
      email: userDataDB.email,
    });
    userContext.setUserLoggedIn(true);
    Cookies.set("userId", userDataDB.id);
    Cookies.set("name", userDataDB.name);
    Cookies.set("email", userDataDB.email);
  };

  return (
    <>
      <StyledButton onClick={handleOpenMOdal}>LOGIN/REGISTER</StyledButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={width > 900 ? modalStyle : mediumModalStyle}>
          {page === "login" && (
            <Stack>
              <Typography variant="mainSubHeading" marginBottom={2}>
                Login
              </Typography>
              <Typography
                marginBottom={5}
                variant="switchPage"
                onClick={switchPage}
              >
                New user? Sign up
              </Typography>
              {alerts.missingField && <MissingField />}
              {alerts.emailDoesNotExist && <EmailDoesNotExist />}
              {alerts.passwordIncorrect && <PasswordIncorrect />}
              <Stack gap={3} marginBottom={5}>
                <StyledTextField
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleLoginChange}
                />
                <StyledTextField
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                  onChange={handleLoginChange}
                />
              </Stack>
              <SubmitButton onClick={handleLoginSubmit}>Submit</SubmitButton>
            </Stack>
          )}
          {page === "register" && (
            <Stack>
              <Typography marginBottom={2} variant="mainSubHeading">
                Register
              </Typography>
              <Typography
                marginBottom={5}
                variant="switchPage"
                onClick={switchPage}
              >
                Already have an account? Login
              </Typography>
              {alerts.emailAlreadyExists && <EmailAlreadyExists />}
              {alerts.missingField && <MissingField />}
              {alerts.passwordsNotMatching && <PasswordsNotMatching />}
              <Stack gap={3} marginBottom={5}>
                <StyledTextField
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleRegisterChange}
                />
                <StyledTextField
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleRegisterChange}
                />
                <StyledTextField
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                  onChange={handleRegisterChange}
                />
                <StyledTextField
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={handleRegisterChange}
                />
              </Stack>
              <SubmitButton onClick={handleRegisterSubmit}>Submit</SubmitButton>
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default LoginRegister;
