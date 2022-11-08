import { useState } from "react";

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
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [page, setPage] = useState<string>("login");

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
              <Stack gap={3}>
                <StyledTextField placeholder="Enter Email" name="email" />
                <StyledTextField
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                />
                <SubmitButton>Submit</SubmitButton>
              </Stack>
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
              <Stack gap={3}>
                <StyledTextField placeholder="Enter Name" name="name" />
                <StyledTextField placeholder="Enter Email" name="email" />
                <StyledTextField
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                />
                <StyledTextField
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <SubmitButton>Submit</SubmitButton>
              </Stack>
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default LoginRegister;
