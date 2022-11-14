import React, { useState } from "react";

import { Box, Button, Drawer, Modal, Stack, Typography } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

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

const Notifications = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Stack
        flexDirection="row"
        onClick={handleOpenMOdal}
        sx={{ cursor: "pointer" }}
      >
        <Typography sx={{ color: "#fff" }}>Notifications</Typography>;
        <NotificationsIcon sx={{ color: "#fff" }} />
      </Stack>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography>Likes</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Notifications;
