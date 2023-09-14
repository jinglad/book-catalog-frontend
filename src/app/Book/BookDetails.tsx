/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Modal, Text } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBookQuery,
} from "../../redux/api/bookApi";
import Book from "./Book";
import Spinner from "../../component/Spinner";
import Reviews from "./Reviews";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery({ id: id as string });
  const [deleteBook, options] = useDeleteBookMutation();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies([config.TOKEN_COOKIE]);
  const token = cookies[config.TOKEN_COOKIE];

  return (
    <Container mt={50}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: 20,
            }}
          >
            <Button
              sx={{
                a: {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
            >
              <Link to={"/edit-book/" + id}>Edit Book</Link>
            </Button>
            {token && (
              <Button
                color="red"
                sx={{
                  marginLeft: 10,
                }}
                onClick={() => {
                  if (token) {
                    setOpened(true);
                  }
                }}
              >
                Delete
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 10,
              marginBottom: 20,
              flex: 1,
              cursor: "pointer",
            }}
          >
            <Book book={book?.data} />
          </Box>
          <Reviews book={book} />
        </>
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirmation"
        centered
      >
        <Box>
          <Text>Are you sure want to delete this book?</Text>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginTop: 20,
            }}
          >
            <Button
              sx={{
                marginRight: 10,
              }}
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteBook({
                  id: id as string,
                }).then((res: any) => {
                  if (res?.data?.success) {
                    setOpened(false);
                    navigate("/");
                    notifications.show({
                      title: "Success",
                      message: "Book deleted successfully",
                      color: "green",
                    });
                  } else {
                    notifications.show({
                      title: "Error",
                      message: res?.data?.message,
                      color: "red",
                    });
                  }
                });
              }}
              loading={options.isLoading}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default BookDetails;
