import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const EmailAlreadyExists = () => {
  return (
    <Box sx={{ width: "100%", marginBottom: "10px" }}>
      <Alert severity="error" sx={{ mb: 2, fontSize: "1rem" }}>
        Email already in use, please choose a different one
      </Alert>
    </Box>
  );
};

export default EmailAlreadyExists;
