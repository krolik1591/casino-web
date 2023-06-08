import React from 'react';
import ReactDOM from 'react-dom/client';
import {createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Root} from "./pages/Root";
import WOF from "./pages/WOF/WOF";
import Index from './pages/Index';
import {AuthProvider} from "react-auth-kit";

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
      <AuthProvider authType={'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                    cookieSecure={window.location.protocol === "https:"}>
          <RouterProvider router={router}/>
      </AuthProvider>
  </React.StrictMode>
);
