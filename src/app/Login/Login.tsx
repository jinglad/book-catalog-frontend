/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Text, TextInput } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/api/authSlice";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies([config.TOKEN_COOKIE]);

  const [register, options] = useRegisterMutation();
  const [login, loginOptions] = useLoginMutation();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  console.log(cookies);

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = user;
    if (email && password) {
      register({
        email: email.toString(),
        password: password.toString(),
        name: name?.toString(),
      })
        .then(() => {
          setUser({
            email: "",
            password: "",
            name: "",
          });
          notifications.show({
            title: "Success",
            message: "Register successfully",
            color: "teal",
            autoClose: 5000,
          });
          navigate("/login");
        })
        .catch(() => {
          notifications.show({
            title: "Error",
            message: "Register failed",
            color: "red",
            autoClose: 5000,
          });
        });
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = user;
    if (email && password) {
      login({
        email: email.toString(),
        password: password.toString(),
      })
        .then((res: any) => {
          if (res.data?.data?.accessToken) {
            setCookie(config.TOKEN_COOKIE, res.data?.data?.accessToken, {
              path: "/",
              maxAge: 3600,
              sameSite: true,
            });

            setUser({
              email: "",
              password: "",
              name: "",
            });
            navigate(location.state?.from || "/", { replace: true });
          } else {
            notifications.show({
              title: "Error",
              message: res?.error?.data?.message,
              color: "red",
              autoClose: 5000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          notifications.show({
            title: "Error",
            message: "Login failed",
            color: "red",
            autoClose: 5000,
          });
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 400,
          // backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button onClick={() => navigate("/")}>Back to Home</Button>
        <Text
          sx={{
            fontSize: 30,
            fontWeight: 500,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {location.pathname === "/login" ? "Login" : "Signup"}
        </Text>
        <form
          onSubmit={
            location.pathname === "/login" ? handleLogin : handleRegistration
          }
        >
          {location.pathname !== "/login" ? (
            <TextInput
              placeholder="Your name"
              label="Full name"
              withAsterisk
              name="name"
              sx={{
                marginBottom: 20,
              }}
              onChange={(e) => {
                setUser({ ...user, name: e.currentTarget.value });
              }}
              value={user.name}
            />
          ) : null}
          <TextInput
            placeholder="Your email"
            label="Email"
            withAsterisk
            type="email"
            name="email"
            sx={{
              marginBottom: 20,
            }}
            onChange={(e) => {
              setUser({ ...user, email: e.currentTarget.value });
            }}
            value={user.email}
          />
          <TextInput
            placeholder="Your password"
            label="Password"
            withAsterisk
            type="password"
            name="password"
            sx={{
              marginBottom: 20,
            }}
            onChange={(e) => {
              setUser({ ...user, password: e.currentTarget.value });
            }}
            value={user.password}
          />
          <Button
            type="submit"
            sx={{
              width: "100%",
            }}
            loading={options.isLoading || loginOptions.isLoading}
          >
            Submit
          </Button>
        </form>
        <Text
          sx={{
            fontSize: 14,
            fontWeight: 500,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {location.pathname === "/login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Text
            sx={{
              color: "blue",
              cursor: "pointer",
              marginLeft: 5,
            }}
            onClick={() =>
              navigate(location.pathname === "/login" ? "/signup" : "/login")
            }
          >
            {location.pathname === "/login" ? "Signup" : "Login"}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
