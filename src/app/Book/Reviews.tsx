/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useAddReviewMutation } from "../../redux/api/bookApi";
import ReviewsList from "./ReviewsList";
import { ISingleBookData } from "../../interface/book.interface";
import { notifications } from "@mantine/notifications";

const Reviews = ({ book }: { book: ISingleBookData }) => {
  const [review, setReview] = useState("");
  const [addReview, options] = useAddReviewMutation();

  const handleSubmit = () => {
    const newReview = {
      id: book?.data?.id,
      review,
    };
    addReview(newReview).then((res: any) => {
      if (res?.data?.success) {
        setReview("");
        notifications.show({
          title: "Success",
          message: "Review added successfully",
          color: "green",
        });
      }
    });
  };

  console.log(book);

  return (
    <Box>
      <Title>Reviews</Title>
      <Box
        sx={{
          display: "flex",
          gap: 10,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Write a review"
          sx={{
            flex: 1,
            resize: "none",
          }}
          value={review}
          onChange={(e) => setReview(e.currentTarget.value)}
        />
        <Button loading={options.isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <ReviewsList reviews={book?.data?.reviews} />
    </Box>
  );
};

export default Reviews;
