import React from 'react';
import {useAuthUser, useSignIn, useSignOut} from 'react-auth-kit';
import TelegramLoginButton from 'react-telegram-login';
import {Button} from "react-bootstrap";
import {botUsername} from "../config";

export default function Index() {
    const authF = useAuthUser()
    const signOut = useSignOut()


    const auth = authF();

    if (!auth)
        return <Login botName={botUsername}/>

    return (
      <div>
          <h1> Hi {auth.first_name} </h1>
          <Button variant={"danger"} onClick={() => signOut()}>Sign Out</Button>
      </div>
    )

}


function Login({botName}) {
    const signIn = useSignIn()

    const handleTelegramResponse = (response) => {
        const res = signIn({
            token: "",
            expiresIn: 99999999,
            tokenType: "Bearer",
            authState: response
        })
        if (!res) alert("Error")
    }

    const fakeLogin = {
        "id": 185520398,
        "first_name": "Владислав 𓃟",
        "last_name": "Свиненко 🐽🇺🇦🍉",
        "username": "svinerus",
        "photo_url": "https://t.me/i/userpic/320/t2c3DhP5N1bUMFDRT9VrWcVLuye72dski48w33DI24Q.jpg",
        "auth_date": 1686249017,
        "hash": "fb9652fa95c3a9d0af16bd9103c16c8976b3c03e0bb9f1288640c31fc98ac2ab"
    }

    return <>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={botName}/>
        <Button onClick={() => handleTelegramResponse(fakeLogin)}>Fake login as svin</Button>
    </>
}
