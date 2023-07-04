import React, {useState} from 'react';
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";

const Ban = function () {
    const auth = useAuthUser()
    const [ban, setBan] = useState("")
    function banUser(e) {
        // e.preventDefault()
        const banData = {
            ban_it: ban,
            admin_id: auth().id,
        }
        console.log(banData)
        setBan("")
        backend("/users/ban", auth(), banData)
    }

    return (
        <div>
            <h2>Ban user</h2>
            <p>Enter user id:</p>
            <input
                type="number"
                placeholder="User id"
                onChange={(e) => setBan(e.target.value)}
            />
            <button onClick={banUser}>Ban</button>
        </div>
    );
};

export default Ban;