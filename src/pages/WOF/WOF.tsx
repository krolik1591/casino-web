import React, {useEffect, useState} from 'react';
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";
import ShowTickets from "./ShowTickects";
import CreateWheel, {dateToISO, MyInput} from "./CreateWheel";
import {Button, Form} from "react-bootstrap";

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
            <ChangeDate initialDate={new Date(wheel.timestamp_end * 1000)}/>

            {winners.map((winner, index) => (
                <p key={index}> Nearest winner {index + 1}: User: {winner[1]}, Ticket number: {winner[0]} </p>
            ))}
            <button onClick={handleBuyTicket}>Купити виграшний білет</button>
            <ShowTickets tickets={info.tickets}/>
        </div>
    )
}

function ChangeDate(props) {
    const auth = useAuthUser()
    const [endDate, setEndDate] = useState(dateToISO(props.initialDate))

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            end_date: Math.floor(+new Date(endDate) / 1000),
        }
        alert(JSON.stringify(data))
        const res = await backend("/change_date_end", auth(), data)
        console.log(res)
    }

    return <Form onSubmit={handleSubmit}>
        <MyInput label={" When spin? "}>
            <Form.Control type="datetime-local" name={'end_date'} value={endDate} onChange={e => setEndDate(e.target.value)}/>
            <Button type='submit' variant={'success'}> Edit </Button>

        </MyInput>
    </Form>
}

export default WOF;
