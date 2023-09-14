import { Box, Text } from "@mantine/core";

const ReviewsList = ({ reviews }: { reviews: string[] }) => {
  return (
    <Box
      sx={{
        marginTop: 10,
      }}
    >
      {reviews.map((review, index) => (
        <Box
          key={index}
          sx={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <Text>{review}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewsList;
