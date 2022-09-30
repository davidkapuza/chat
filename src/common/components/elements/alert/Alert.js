import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function CustomAlert({ error, ...props }) {
  return (
    error && (
      <Alert {...props}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error?.message || error}</AlertDescription>
        </Box>
      </Alert>
    )
  );
}

export default CustomAlert;
