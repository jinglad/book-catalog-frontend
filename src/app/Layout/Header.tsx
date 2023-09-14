import { Box, Button, Container, Text } from "@mantine/core";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { config } from "../../config/config";

const Header = () => {
  const [cookies, setCookie] = useCookies([config.TOKEN_COOKIE]);
  const token = cookies[config.TOKEN_COOKIE];

  const logOut = () => {
    setCookie(config.TOKEN_COOKIE, "", {
      path: "/",
      maxAge: 0,
    });
  };

  return (
    <Box
      sx={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container
        size="xl"
        sx={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          sx={{
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1.5,
            textTransform: "uppercase",
            border: "2px solid teal",
            padding: "10px 20px",
            a: {
              textDecoration: "none",
              color: "inherit",
            },
          }}
        >
          <Link to="/">Book Store</Link>
        </Text>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            a: {
              color: "inherit",
              textDecoration: "none",
            },
          }}
        >
          <Link to="/">
            <Button
              sx={{
                fontSize: 18,
                fontWeight: 500,
                lineHeight: 1.5,
                textTransform: "uppercase",
                backgroundColor: "teal",
                color: "white",
                padding: "10px 20px",
                borderRadius: 10,
              }}
            >
              All Books
            </Button>
          </Link>
          {token ? (
            <Button
              sx={{
                fontSize: 18,
                fontWeight: 500,
                lineHeight: 1.5,
                textTransform: "uppercase",
                cursor: "pointer",
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: 10,
              }}
              onClick={logOut}
            >
              Log Out
            </Button>
          ) : (
            <Link to="/login">
              <Button
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                  backgroundColor: "orange",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
