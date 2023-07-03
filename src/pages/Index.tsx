import React, {useEffect, useState} from 'react';
import {useAuthUser, useSignIn, useSignOut} from 'react-auth-kit';
import TelegramLoginButton from 'react-telegram-login';
import {Alert, Button, Form} from "react-bootstrap";
import {backendUrl, botUsername} from "../config";
import {backend} from "../helpers/backend";
import {MyInput} from "../components/MyInput";

export default function Index() {
    const authF = useAuthUser()
    const signOut = useSignOut()

    const auth = authF();
    const [backendInfo, setBackendInfo] = useState(undefined)

    useEffect(() => {
        if (!auth) return;
        backend("/info", authF()).then(setBackendInfo).catch(setBackendInfo);
    }, []);

    if (!auth)
        return <Login botName={botUsername}/>

    function BackendInfo() {
        if (backendInfo === undefined) return <p>Loading backend info...</p>;
        if (backendInfo instanceof Error) return <Alert variant={"danger"}>Backend error: {backendInfo.message}</Alert>;
        return <p> Bot: <a href={backendInfo.bot_info.url}>
            {backendInfo.bot_info.name} (@{backendInfo.bot_info.username})
        </a></p>
    }

    return <div>
        <h1> Hi {auth.first_name} </h1>
        <p>Your id: {auth.id}; @{auth.username}</p>
        <p>Backend url: <a href={backendUrl}>{backendUrl}</a></p>
        <BackendInfo/>
        <Button variant={"danger"} onClick={() => signOut()}>Sign Out</Button>
    </div>

}


function Login({botName}) {
    const signIn = useSignIn()

    function handleTelegramResponse(response) {
        const res = signIn({
            token: "token",
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
        <h1>Login</h1>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={botName}/>
        {/*<Button onClick={() => handleTelegramResponse(fakeLogin)}>Fake login as svin (185520398) /*/}
        {/*    @stillnowoman_bot</Button>*/}
        <KeyLogin handleLogin={handleTelegramResponse}/>
    </>
}

function KeyLogin({handleLogin}) {
    const [value, setValue] = useState("")
    function handleKeyLogin() {
        const authJson = atob(value);
        const auth = JSON.parse(authJson);
        handleLogin(auth)
    }

    return <>
        <MyInput label={'Авторизація через ключ з боту /admin_login'}>
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Введіть ключ"
            />

            <Button onClick={handleKeyLogin}>Login</Button>
        </MyInput>
    </>
}