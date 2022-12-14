import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Box, Modal, Stack, Typography } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import useWindowDimensions from "./useWindowDimensions";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  bgcolor: "#fff",
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

interface Notification {
  id: string;
  authorName: string;
  content: string;
  date: Date;
}

const Notifications = () => {
  const { height, width } = useWindowDimensions();

  const userContext = useContext(UserContext);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Handle Comment Notifications

  const [commentNots, setCommentNots] = useState<Notification[]>([]);

  const getCommentNots = async () => {
    let response = await fetch(`/comment_nots/${userContext.user.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    setCommentNots(result);
  };

  const renderCommentNots = commentNots.map((not) => {
    return (
      <Typography
        key={not.id}
        sx={{
          fontFamily: "Lato, sans-serif",
          fontSize: "1rem",
          color: "#302061",
        }}
      >
        {not.authorName} commented on your post "{not.content.slice(0, 7)}
        ..."
      </Typography>
    );
  });

  // Handle Like Notifications

  const [likeNots, setLikeNots] = useState<Notification[]>([]);

  const getLikeNots = async () => {
    let response = await fetch(`/like_nots/${userContext.user.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    setLikeNots(result);
    // console.log(result);
  };
  const renderLikeNots = likeNots.map((not) => {
    return (
      <Typography
        sx={{
          fontFamily: "Lato, sans-serif",
          fontSize: "0.8rem",
          color: "#302061",
        }}
        key={not.id}
      >
        {not.authorName} liked your post "{not.content.slice(0, 7)}
        ..."
      </Typography>
    );
  });

  useEffect(() => {
    getCommentNots();
    getLikeNots();
  }, []);

  return (
    <>
      <Stack
        flexDirection="row"
        onClick={handleOpenMOdal}
        sx={{ cursor: "pointer" }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xl: "1.8rem", lg: "1.6rem", md: "1.4" },
          }}
        >
          Notifications
        </Typography>
        ;
        <NotificationsIcon sx={{ color: "#fff" }} />
      </Stack>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={width > 900 ? modalStyle : mediumModalStyle}>
          {renderCommentNots.length > 0 ? (
            <Box>
              <Typography variant="mainSecondary">Comments</Typography>

              <Stack marginTop={6} marginBottom={6} gap={4}>
                {renderCommentNots}
              </Stack>
            </Box>
          ) : (
            <Box marginBottom={6}>
              <Typography variant="mainSecondary">
                No comment notifications
              </Typography>
            </Box>
          )}

          <Stack marginTop={6} gap={4}>
            {renderLikeNots.length > 0 ? (
              <Box>
                <Typography variant="mainSecondary">Likes</Typography>

                <Stack marginTop={6} marginBottom={6} gap={4}>
                  {renderLikeNots}
                </Stack>
              </Box>
            ) : (
              <Box marginBottom={6}>
                <Typography variant="mainSecondary">
                  No like notifications
                </Typography>
              </Box>
            )}
            {/* {renderLikeNots} */}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Notifications;
