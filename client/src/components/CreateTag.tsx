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
  width: "24rem",
  bgcolor: "#f2eefe",
  boxShadow: 24,
  p: 4,
  borderRadius: "30px",
  padding: "4rem",
};

const CreateTag = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setNewTag("");
    setOpenModal(false);
  };

  const [newTag, setNewTag] = useState<string>("");

  const handleNewTagChange = (e: React.FormEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    setNewTag(value);
  };

  const handleNewTagSubmit = async () => {
    if (!newTag) {
      return;
    }
    let response = await fetch("http://localhost:8080/createTag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTag }),
    });
    let result = await response.json();
    console.log(result);
    if (
      result === 'duplicate key value violates unique constraint "tag_name_key"'
    ) {
      handleCloseModal();
    }
    if (result === "Tag added succesfully") {
      handleCloseModal();
    }
  };

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
            <StyledTextField
              inputProps={{ maxLength: 20 }}
              onChange={handleNewTagChange}
            />
            <SubmitButton onClick={handleNewTagSubmit}>Add Tag</SubmitButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTag;
