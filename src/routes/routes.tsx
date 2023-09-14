import { createBrowserRouter } from "react-router-dom";
import Login from "../app/Login/Login";
import Home from "../app/Home/Home";
import Header from "../app/Layout/Header";
import AddBook from "../app/Book/AddBook";
import PrivateRoute from "../app/PrivateRoute/PrivateRoute";
import BookDetails from "../app/Book/BookDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/add-new-book",
    element: (
      <PrivateRoute>
        <>
          <Header />
          <AddBook />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/edit-book/:id",
    element: (
      <PrivateRoute>
        <>
          <Header />
          <AddBook />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <>
        <Header />
        <BookDetails />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default routes;
