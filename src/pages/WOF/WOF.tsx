import React, {useEffect} from 'react';
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";
import ShowTickets from "./ShowTickects";
import CreateWheel from "./CreateWheel";

function WOF() {
    const auth = useAuthUser()
    const [wheel, setWheel] = React.useState(undefined)

    useEffect(() => {
        // console.log(auth().id)

        backend("/get_fortune_wheel", auth()).then(setWheel)
    }, [])


    if (wheel)
        return <ShowWheel info={wheel}/>
    return <CreateWheel/>
}


function ShowWheel({info}) {
    const wheel = info.wheel;
    const winners = info.winners_info
    const auth = useAuthUser()

    const handleBuyTicket = async () => {
        const addTicket = {'admin_id': auth().id}
        const res = await backend("/add_win_ticket", auth(), addTicket)
        console.log(res)
    };


    console.log(winners)
    return (
        <div className="container">
            <h1> Current wheel of fortune: </h1>
            <p> Ticket cost: {wheel.ticket_cost} </p>
            <p> Commission: {wheel.commission} </p>
            <p> Rewards: {wheel.rewards} </p>
            <p> Creation date: {wheel.timestamp_start} </p>
            <p> End date: {wheel.timestamp_end} </p>
            {winners.map((winner, index) => (
                <p key={index}> Nearest winner {index+1}: {winner[1]}, Ticket number: {winner[0]} </p>
            ))}
            <button onClick={handleBuyTicket}>Купити виграшний білет</button>
            <ShowTickets tickets={info.tickets}/>
        </div>
    )
}


export default WOF;
