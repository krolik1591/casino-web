import React, {useEffect, useState} from 'react';
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";
import ShowTickets from "./ShowTickects";
import CreateWheel, {dateToISO} from "./CreateWheel";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {MyInput} from "../../components/MyInput";

function WOF() {
    const auth = useAuthUser()
    const [wheel, setWheel] = React.useState(undefined)

    useEffect(() => {
        backend("/wof/get", auth()).then(setWheel).catch(setWheel);
    }, [])


    if (wheel === undefined)
        return <p>Loading...</p>
    if (wheel instanceof Error)
        return <Alert variant={"danger"}>Getting info about wheel: {wheel.message}</Alert>
    if (wheel === null)
        return <CreateWheel/>

    return <div>
        <ShowWheelInfo wheel={wheel.wheel}/>
        <hr className="m-3"/>
        <ShowWinners winners={wheel.winners_info}/>
        <hr className="m-5"/>
        <ShowTickets tickets={wheel.tickets}/>
    </div>
}


function ShowWheelInfo({wheel}) {
    return <Container>
        <h1> Current wheel of fortune: </h1>
        <p> Ticket cost: {wheel.ticket_cost} </p>
        <p> Commission: {wheel.commission}% </p>
        <p> Rewards: {JSON.parse(wheel.rewards).map((r) => r + "%").join(", ")} </p>
        <p> Creation date: {dateToISO(new Date(wheel.timestamp_start*1000))} </p>
        <ChangeDate initialDate={new Date(wheel.timestamp_end * 1000)}/>
        <p>todo: total tickets count, total tickets cost, total win amount</p>
    </Container>
}


function ShowWinners({winners}) {
    function Winner({index, winner}) {
        return <Card> <Card.Body>
            <Card.Title>{index + 1}: <code>#TODO</code></Card.Title>
            <Card.Text>Nearest bought ticket: <b><code>{winner[0]}</code></b> <br/>
                by user: {winner[1]}</Card.Text>
            <Card.Text>Win amount: #TODO</Card.Text>
        </Card.Body> </Card>
    }

    return <Container>
        <h3>Winner tickets</h3>
        <Row>
            {winners.map((winner, index) => (
              <Col key={index} sm={6} md={4} lg={3}>
                <Winner index={index} winner={winner}/>
              </Col>
            ))}
        </Row>

        <br/>
        <BuyTicket/>
    </Container>
}

function BuyTicket() {
    const auth = useAuthUser()
    const [resp, setResp] = useState(undefined)

    const handleBuyTicket = async () => {
        const addTicket = {'admin_id': auth().id}
        await backend("/wof/add_win_ticket", auth(), addTicket).then(setResp).catch(setResp)
    };

    function Result() {
        if (resp === undefined) return;
        if (resp instanceof Error) return <Alert variant={"danger"}> {resp.message} </Alert>
        window.location.reload();
        return <Alert variant={"success"}> Білет куплено </Alert>
    }

    return <>
        <Button onClick={handleBuyTicket}>Купити виграшний білет</Button>
        <Result/>
    </>
}

function ChangeDate(props) {
    const auth = useAuthUser()
    const [endDate, setEndDate] = useState(dateToISO(props.initialDate))
    const [resp, setResp] = useState(undefined)

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            end_date: Math.floor(+new Date(endDate) / 1000),
        }

        backend("/wof/change_date_end", auth(), data).then(setResp).catch(setResp)
    }


    function Result() {
        if (resp === undefined) return;
        if (resp instanceof Error) return <Alert variant={"danger"}> {resp.message} </Alert>
        return <Alert variant={"success"}>Дату змінено</Alert>
    }

    return <Form onSubmit={handleSubmit}>
        <MyInput label={" When spin? "}>
            <Form.Control type="datetime-local" name={'end_date'} value={endDate}
                          onChange={e => setEndDate(e.target.value)}/>
            <Button type='submit' variant={'success'}> Edit </Button>
        </MyInput>
        <Result/>
    </Form>
}

export default WOF;
