import React from 'react';
import ReactDOM from 'react-dom/client';
import {createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Root} from "./pages/Root";
import WOF from "./pages/WOF/WOF";
import Index from './pages/Index';

const router = createHashRouter([
  // todo dynamic title?
  {
    path: "/",
    element: <Root/>,
    errorElement: <Navigate to={"/"}/>,
    children: [
      {index: true, element: <Index/>},
      {path: "wof", element: <WOF/>,},
    ]
  },
  {path: "*", element: <Navigate to={"/"}/>}


]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
