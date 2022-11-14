import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

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

interface Notification {
  id: string;
  authorName: string;
  postContent: string;
  date: Date;
}

const Notifications = () => {
  const userContext = useContext(UserContext);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Handle Comment Notifications

  const [commentNots, setCommentNots] = useState<Notification[]>([]);

  const getCommentNots = async () => {
    let response = await fetch(
      `http://localhost:8080/comment_nots/${userContext.user.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = await response.json();
    setCommentNots(result);
  };

  // Handle Like Notifications

  const [likeNots, setLikeNot] = useState<Notification[]>([]);

  useEffect(() => {
    getCommentNots();
  }, []);

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
