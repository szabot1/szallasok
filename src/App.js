import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import GetAll from "./routes/get-all";
import Get from "./routes/get";
import Edit from "./routes/edit";
import Create from "./routes/create";
import Login from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/get-all",
    element: <GetAll />,
  },
  {
    path: "/get/:id",
    element: <Get />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/get-all" />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

export function isValid(place) {
  return (
    place.id &&
    place.name &&
    place.location &&
    place.hostname &&
    place.price &&
    place.minimum_nights
  );
}
