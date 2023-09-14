/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { bookGenres } from "./book.utils";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import "dayjs/locale/ru";
import {
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../redux/api/bookApi";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../component/Spinner";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    genre: "",
    publicationDate: new Date(),
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: editbook, isLoading: editBookLoading } = useGetBookQuery({
    id: id as string,
  });

  const [addBook, options] = useAddBookMutation();
  const [updateBook, updateOptions] = useUpdateBookMutation();

  const [cookies] = useCookies([config.TOKEN_COOKIE]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBook: {
      title: string;
      genre: string;
      publicationDate: Date;
      id?: string;
    } = {
      ...book,
    };

    if (id) {
      newBook.id = id;
      updateBook({ book: newBook, token: cookies[config.TOKEN_COOKIE] }).then(
        (res: any) => {
          if (res?.data?.success) {
            notifications.show({
              title: "Success",
              message: "Book updated successfully",
              color: "green",
            });
            setBook({
              title: "",
              genre: "",
              publicationDate: new Date(),
            });
            navigate("/");
          }
        }
      );
      return;
    }

    addBook({ book: newBook, token: cookies[config.TOKEN_COOKIE] })
      .then((res: any) => {
        if (res?.data?.success) {
          notifications.show({
            title: "Success",
            message: "Book added successfully",
            color: "green",
          });
          setBook({
            title: "",
            genre: "",
            publicationDate: new Date(),
          });
          navigate("/");
        }
      })
      .catch((err) => {
        notifications.show({
          title: "Error",
          message: err?.data?.message,
          color: "red",
        });
      });
  };

  useEffect(() => {
    if (editbook?.data) {
      setBook({
        title: editbook?.data?.title,
        genre: editbook?.data?.genre,
        publicationDate: new Date(editbook?.data?.publicationDate),
      });
    }
  }, [editbook]);

  if (id && editBookLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            sx={{
              fontSize: 30,
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {id ? "Edit book" : "Add book"}
          </Text>
          <Button
            sx={{
              marginBottom: 20,
              a: {
                textDecoration: "none",
                color: "inherit",
              },
            }}
          >
            <Link to="/">Back to home</Link>
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="Book title"
            label="Book title"
            withAsterisk
            name="title"
            sx={{
              marginBottom: 20,
            }}
            onChange={(e) => {
              setBook({ ...book, title: e.currentTarget.value });
            }}
            value={book.title}
          />
          <Select
            label="Choose genre of the book"
            placeholder="Pick one"
            data={bookGenres}
            searchable
            maxDropdownHeight={400}
            nothingFound="Nothing found"
            filter={(value, item: { label: string; value: string }) =>
              item.label.toLowerCase().includes(value.toLowerCase().trim())
            }
            sx={{
              marginBottom: 20,
            }}
            onChange={(value) => {
              setBook({ ...book, genre: value as string });
            }}
            value={book.genre}
          />

          <DatesProvider
            settings={{ locale: "en", firstDayOfWeek: 0, weekendDays: [0] }}
          >
            <DatePickerInput
              mt="md"
              label="Publication date"
              placeholder="Pick Publication date"
              sx={{
                marginBottom: 20,
              }}
              value={book.publicationDate}
              onChange={(value) => {
                if (value) {
                  setBook({ ...book, publicationDate: value });
                }
              }}
            />
          </DatesProvider>

          <Button
            sx={{
              width: "100%",
            }}
            type="submit"
            loading={options.isLoading || updateOptions.isLoading}
          >
            {id ? "Update book" : "Add book"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddBook;
