import { Box, Loader } from "@mantine/core";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Loader />
    </Box>
  );
};

export default Spinner;
