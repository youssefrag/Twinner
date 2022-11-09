import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

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
    backgroundColor: theme.palette.primary.light,
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

const LoginRegister = () => {
  const userContext = useContext(UserContext);

  //   console.log(userContext);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [page, setPage] = useState<string>("login");

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    if (userLogin === null) {
      alert("Missing Field");
      return;
    }
    const { email, password } = userLogin;
    if (!email || !password) {
      alert("Missing Field");
      return;
    }
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
      alert("Missing Fields");
      return;
    }
    const { name, email, password, confirmPassword } = userRegister;
    if (!name || !email || !password || !confirmPassword) {
      alert("Missing Field");
      return;
    } else if (password !== confirmPassword) {
      alert("passwords are not matching");
      return;
    }
    let response = await fetch("http://localhost:8080/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    });
    let result = await response.json();
    console.log(result.rows[0]);
    userContext.setUser({
      userId: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
    });
    userContext.setUserLoggedIn(true);
    Cookies.set("userId", result.rows[0].id);
    Cookies.set("name", result.rows[0].name);
    Cookies.set("email", result.rows[0].email);
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
        <Box sx={modalStyle}>
          {page === "login" && (
            <Stack>
              <Typography variant="mainSubHeading" marginBottom={2}>
                Login
              </Typography>
              <Typography
                marginBottom={5}
                variant="switchPage"
                onClick={() => setPage("register")}
              >
                New user? Sign up
              </Typography>
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
                onClick={() => setPage("login")}
              >
                Already have an account? Login
              </Typography>
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
