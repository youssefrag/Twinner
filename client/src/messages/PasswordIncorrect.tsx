import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const PasswordIncorrect = () => {
  return (
    <Box sx={{ width: "80%", marginBottom: "10px" }}>
      <Alert severity="error" sx={{ mb: 2, fontSize: "1rem" }}>
        Password is incorrect
      </Alert>
    </Box>
  );
};

export default PasswordIncorrect;
