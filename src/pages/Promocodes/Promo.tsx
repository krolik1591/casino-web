import {Alert, Button, Container, Form, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {MyInput} from "../../components/MyInput";
import {useAuthUser} from "react-auth-kit";
import {backend} from "../../helpers/backend";

export default function Promo() {
    return <Container>
        <h2>Promo</h2>
        <TicketInput></TicketInput>
    </Container>
}


function TicketInput() {
    const auth = useAuthUser()
    const [resp, setResp] = useState(undefined)


    const [input, setInput] = useState({
        ticket_name: 'putin loh',
        bonus: 100,
        type: 1,
        number_of_uses: 1,
        number_of_users: 0,
        time_of_existence: 14,
        time_of_duration: 14,
        min_wager: 1,
        wager: 10,
        special_users: ""
    })

    const handleChange = ({ target }) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setInput((values) => ({ ...values, [target.name]: value }));
    };


    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            ticket_name: input.ticket_name,
            bonus: input.bonus,
            type: input.type,
            number_of_uses: input.number_of_uses,
            number_of_users: input.number_of_users,
            time_of_existence: input.time_of_existence,
            time_of_duration: input.time_of_duration,
            min_wager: input.min_wager,
            wager: input.wager,
            special_users: input.special_users,
            admin_id: auth().id,
        }
        backend("/promo/create", auth(), data).then(setResp).catch(setResp)
    }

    function Result() {
        if (resp === undefined) return;
        if (resp instanceof Error) return <Alert variant={"danger"}> {resp.message} </Alert>
        window.location.reload();
        return <Alert variant={"success"}>Промокод створено!</Alert>
    }


    return (
        <Container>

            <h1> Create new promo code </h1>
            <Form onSubmit={handleSubmit}>
                <MyInput label={" Промокод "}>
                    <Form.Control type="text" name={'ticket_name'} value={input.ticket_name} onChange={handleChange}/>
                </MyInput>
                <MyInput label={"Бонус %"}>
                    <Form.Control type="number" name="bonus" value={input.bonus} onChange={handleChange}/>
                    <InputGroup.Text> % </InputGroup.Text>
                </MyInput>
                <MyInput label={"Тип білету: 1 - баланс, 2 - тікети (поки тільки 1)"}>
                    <Form.Control type="number" name={'type'} value={input.type} onChange={handleChange}/>
                </MyInput>
                <MyInput label={"Min wager"}>
                    <Form.Control type="number" name="min_wager" value={input.min_wager} onChange={handleChange}/>
                    <InputGroup.Text> * </InputGroup.Text>
                </MyInput>
                <MyInput label={"Wager"}>
                    <Form.Control type="number" name="wager" value={input.wager} onChange={handleChange}/>
                    <InputGroup.Text> * </InputGroup.Text>
                </MyInput>
                <MyInput label={"Кількість використань на 1 юзера"}>
                    <Form.Control type="number" name="number_of_uses" value={input.number_of_uses} onChange={handleChange}/>
                </MyInput>
                <MyInput label={"Кількість юзерів (0 == Infinity) (не зроблено)"}>
                    <Form.Control type="number" name="number_of_users" value={input.number_of_users} onChange={handleChange}/>
                </MyInput>
                <MyInput label={"Скільки існує промокод (в днях)"}>
                    <Form.Control type="number" name="time_of_existence" value={input.time_of_existence} onChange={handleChange}/>
                </MyInput>
                <MyInput label={"Скільки промокод діє для юзера (в днях)"}>
                    <Form.Control type="number" name="time_of_duration" value={input.time_of_duration} onChange={handleChange}/>
                </MyInput>
                <MyInput label={"Айді особливих юзерів (через кому) (порожня строфа == промокод для усіх)"}>
                    <Form.Control type="text" name="special_users" value={input.special_users} onChange={handleChange}/>
                </MyInput>

                <Button type='submit'> Create </Button>
            </Form>

            <Result/>
        </Container>
    );
}

