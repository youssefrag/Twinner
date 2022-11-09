import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const EmailDoesNotExist = () => {
  return (
    <Box sx={{ width: "80%", marginBottom: "10px" }}>
      <Alert severity="error" sx={{ mb: 2, fontSize: "1rem" }}>
        Email does not exist
      </Alert>
    </Box>
  );
};

export default EmailDoesNotExist;
