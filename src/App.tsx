import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Notifications } from "@mantine/notifications";

export default function App() {
  return (
    <MantineProvider>
      <Provider store={store}>
        <Notifications position="top-right" />
        <RouterProvider router={routes} />
      </Provider>
    </MantineProvider>
  );
}
