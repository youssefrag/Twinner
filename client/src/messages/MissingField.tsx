import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const MissingField = () => {
  return (
    <Box sx={{ width: "90%", marginBottom: "10px" }}>
      <Alert severity="error" sx={{ mb: 2, fontSize: "1rem" }}>
        Please fill out all the required fields
      </Alert>
    </Box>
  );
};

export default MissingField;
