import React, {useEffect} from 'react';
import {Button, Form, FormGroup} from "react-bootstrap";

function App() {
    const [input, setInput] = React.useState({ticket_cost: 100, end_date: 0, commission: 10, winners: 1, distribution: []})
    const [wheelExist, setWheelExist] = React.useState(undefined)

    async function getFortuneWheel() {
        const res = await fetch("http://localhost:8080/get_fortune_wheel")
        const resJson = await res.json()
        console.log(JSON.stringify(resJson))
        return resJson
    }
    useEffect(() => {getFortuneWheel().then(setWheelExist)}, [])
    async function handleSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(input))

        const res = await fetch("http://localhost:8080/create_fortune_wheel", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(input)
        })
        const resJson = await res.json()
        console.log(resJson)
    }
    const handleChange = ({target}) => setInput(values => ({...values, [target.name]: target.value}))
    const handleDistributionChange = (event, index) => {
        const value = event.target.value;
        setInput((values) => {
            const newDistribution = [...values.distribution];
            newDistribution[index] = value;
            return { ...values, distribution: newDistribution };
        });
    };

    const handleAddDistribution = () => {
        setInput((values) => {
            const newDistribution = [...values.distribution, 0];
            return { ...values, distribution: newDistribution };
        });
    };
    if (wheelExist) {
        return (
            <div className="container">
                <h1> Wheel of fortune already exist </h1>
                <h2> Ticket cost: {wheelExist.ticket_cost} </h2>
                <h2> End date: {wheelExist.date_creature} </h2>
                <h2> End date: {wheelExist.date_end} </h2>
            </div>
        )
    }
    return (
        <div className="container">

            <h1> Create wheel of fortune </h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Label> Ticket cost </Form.Label>
                    <Form.Control type="number" name={'ticket_cost'} value={input.ticket_cost} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label> When spin? </Form.Label>
                    <Form.Control type="datetime-local" name={'end_date'} value={input.end_date} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Commission (%)</Form.Label>
                    <Form.Control
                        type="number"
                        name="commission"
                        value={input.commission}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Number of Winners</Form.Label>
                    <Form.Control
                        type="number"
                        name="winners"
                        value={input.winners}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Winning Distribution</Form.Label>
                    {input.distribution.map((percent, index) => (
                        <Form.Control
                            key={index}
                            type="number"
                            value={percent}
                            onChange={(event) => handleDistributionChange(event, index)}
                        />
                    ))}
                    <Button onClick={handleAddDistribution}>Add Distribution</Button>
                </FormGroup>

                <Button type='submit'> Create </Button>
            </Form>

        </div>
    );
}

export default App;
