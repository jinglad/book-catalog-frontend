/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, Select, Text, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/api/bookApi";
import Spinner from "../../component/Spinner";
import Book from "./Book";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { bookGenres } from "./book.utils";
import { DatePickerInput, DatesProvider } from "@mantine/dates";

const Books = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 500);

  const [genre, setGenre] = useState<string>("");
  const [publicationDate, setPublicationDate] = useState<Date>();

  const {
    data: books,
    isLoading,
    isFetching,
  } = useGetBooksQuery({
    searchTerm: debounced,
    genre,
    publicationDate,
  } as any);

  return (
    <Container size="xl" mt={20}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          gap: 10,
        }}
      >
        <TextInput
          placeholder="Search Books"
          sx={{
            flex: 1,
          }}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {/* <Button>Search</Button> */}
      </Box>
      <Box
        sx={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Select
          label="Choose genre"
          placeholder="Pick one"
          data={bookGenres}
          searchable
          maxDropdownHeight={400}
          nothingFound="Nothing found"
          filter={(value, item: { label: string; value: string }) =>
            item.label.toLowerCase().includes(value.toLowerCase().trim())
          }
          sx={{
            flexGrow: 1,
          }}
          onChange={(value) => {
            setGenre(value as string);
          }}
          value={genre}
        />
        <DatesProvider
          settings={{ locale: "en", firstDayOfWeek: 0, weekendDays: [0] }}
        >
          <DatePickerInput
            mt="md"
            label="Publication date"
            placeholder="Pick Publication date"
            sx={{
              flexGrow: 1,
              marginTop: "0rem!important",
            }}
            value={publicationDate}
            onChange={(value) => {
              if (value) {
                setPublicationDate(value);
              }
            }}
          />
        </DatesProvider>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginBottom: 20,
        }}
      >
        <Button onClick={() => navigate("/add-new-book")}>Add Book</Button>
      </Box>
      <Box>
        {isLoading || isFetching ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {books?.data?.length === 0 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  sx={{
                    fontSize: 20,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Book not found
                </Text>
              </Box>
            )}
            {books?.data.map((book) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: 10,
                  marginBottom: 20,
                  width: "45%",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  },
                }}
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <Book book={book} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Books;
