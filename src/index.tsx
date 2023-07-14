import React from 'react';
import ReactDOM from 'react-dom/client';
import {createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Root} from "./pages/Root";
import WOF from "./pages/WOF/WOF";
import Index from './pages/Index';
import {AuthProvider} from "react-auth-kit";
import Promo from "./pages/Promocodes/Promo";
import Settings from './pages/Settings';
import Users from './pages/Users/Users';
import Broadcast from './pages/Broadcast';
import Stats from './pages/Stats';


const router = createHashRouter([
    //         <Nav.Link as={NavLink} to="wof">Wheel of fortune</Nav.Link>
    //         <Nav.Link as={NavLink} to="promo">Promo-codes</Nav.Link>
    //         <Nav.Link as={NavLink} to="broadcast">Broadcast</Nav.Link> {/* Розсилки  */}
    //         <Nav.Link as={NavLink} to="users">Users</Nav.Link> {/* Змінити баланс юзера (демо, реальний, промо, реферальний, лотерейний), Заблокувати юзера,  Задати кастомний реферальний рівень юзера  */}
    //         <Nav.Link as={NavLink} to="settings">Settings</Nav.Link>
    //         <Nav.Link as={NavLink} to="stats">Stats</Nav.Link>
    //       </Nav>
    // todo dynamic title?
    {
        path: "/",
        element: <Root/>,
        errorElement: <Navigate to={"/"}/>,
        children: [
            {index: true, element: <Index/>},
            {path: "wof", element: <WOF/>,},
            {path: "promo", element: <Promo/>,},
            {path: "broadcast", element: <Broadcast/>,},
            {path: "users", element: <Users/>,},
            {path: "settings", element: <Settings/>,},
            {path: "stats", element: <Stats/>,},
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
