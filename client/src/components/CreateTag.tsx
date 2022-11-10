import { useState } from "react";

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90%",
  "& .MuiOutlinedInput-root": {
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  width: "30%",
  backgroundColor: theme.palette.primary.dark,
  fontSize: "1rem",
  padding: "0.5rem 1.2rem",
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
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

const CreateTag = () => {
  const [newTag, setNewTag] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <AddCircleIcon sx={{ cursor: "pointer" }} onClick={handleOpenMOdal} />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Stack gap={6}>
            <Typography variant="mainSecondary">Create Tag</Typography>
            <StyledTextField />
            <SubmitButton>Add Tag</SubmitButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTag;
