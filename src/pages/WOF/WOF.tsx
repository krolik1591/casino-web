import React, {useEffect} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";

function WOF() {
    const auth = useAuthUser()
    const [wheel, setWheel] = React.useState(undefined)

    useEffect(() => {
        backend("/get_fortune_wheel", auth()).then(setWheel)
    }, [])

    async function handleSubmit(input) {
        alert(JSON.stringify(input))
        const res = await backend("/create_fortune_wheel", auth(), input)
        console.log(res)
    }

    if (wheel)
        return <ShowWheel wheel={wheel}/>
    return <CreateForm onSubmit={handleSubmit}/>
}


function ShowWheel({wheel}) {
    return (
      <div className="container">
          <h1> Current wheel of fortune: </h1>
          <p> Ticket cost: {wheel.ticket_cost} </p>
          <p> Creation date: {wheel.date_creature} </p>
          <p> End date: {wheel.date_end} </p>
      </div>
    )
}

function CreateForm({onSubmit}) {
    const [input, setInput] = React.useState({
        ticket_cost: 100,
        end_date: 0,
        commission: 10,
        winners: 1,
        distribution: "70, 20, 10"
    })

    async function handleSubmit(event) {
        event.preventDefault()
        onSubmit(input)
    }

    const handleChange = ({target}) => setInput(values => ({...values, [target.name]: target.value}))


    return (
      <div className="container">

          <h1> Create wheel of fortune </h1>
          <Form onSubmit={handleSubmit}>
              <MyInput label={" Ticket cost "}>
                  <Form.Control type="number" name={'ticket_cost'} value={input.ticket_cost} onChange={handleChange}/>
              </MyInput>
              <MyInput label={" When spin? "}>
                  <Form.Control type="datetime-local" name={'end_date'} value={input.end_date} onChange={handleChange}/>
              </MyInput>
              <MyInput label={"Commission"}>
                  <Form.Control type="number" name="commission" value={input.commission} onChange={handleChange}/>
                  <InputGroup.Text> % </InputGroup.Text>
              </MyInput>
              <MyInput label={"Winning Distribution"}>
                  <Form.Control type="text" name={'distribution'} value={input.distribution} onChange={handleChange}/>
              </MyInput>

              <Button type='submit'> Create </Button>
          </Form>

      </div>
    );
}


function MyInput({children, label}) {
    return <>
        <Form.Label>{label}</Form.Label>
        <InputGroup className="mb-3">
            {children}
        </InputGroup>
    </>
}

export default WOF;
