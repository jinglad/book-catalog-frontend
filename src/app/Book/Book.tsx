import { Box, Text, Title } from "@mantine/core";
import { IBook } from "../../interface/book.interface";
import dayjs from "dayjs";

const Book = ({ book }: { book: IBook }) => {
  return (
    <>
      <Box>
        <Title
          sx={{
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 10,
            textTransform: "capitalize",
          }}
        >
          {book.title?.toLowerCase()}
        </Title>
        <Text
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#666",
          }}
        >
          {book.genre}
        </Text>
      </Box>
      <Box>
        <Text
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#666",
          }}
        >
          {dayjs(book.publicationDate).format("DD MMM YYYY")}
        </Text>
      </Box>
    </>
  );
};

export default Book;
