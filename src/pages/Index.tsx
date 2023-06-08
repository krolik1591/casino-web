import React from 'react';
import TelegramLoginButton from 'react-telegram-login';

export default function Index() {
    return <div>
        Hi
        <Login botName={"stillnowoman_bot"}/>
    </div>
}


function Login({botName}) {
    const handleTelegramResponse = (response) => {
        console.log(response)
    }
    return <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={botName} />
}
