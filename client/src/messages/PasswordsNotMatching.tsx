import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const PasswordsNotMatching = () => {
  return (
    <Box sx={{ width: "80%", marginBottom: "10px" }}>
      <Alert severity="error" sx={{ mb: 2, fontSize: "1rem" }}>
        Passwords are not matching
      </Alert>
    </Box>
  );
};

export default PasswordsNotMatching;
