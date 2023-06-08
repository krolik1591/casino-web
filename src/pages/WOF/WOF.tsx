import React, {useEffect} from 'react';
import {Button, Form, FormGroup} from "react-bootstrap";
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";

function WOF() {
    const auth = useAuthUser()

    const [input, setInput] = React.useState({
        ticket_cost: 100,
        end_date: 0,
        commission: 10,
        winners: 1,
        distribution: "70, 20, 10"
    })
    const [wheelExist, setWheelExist] = React.useState(undefined)

    useEffect(() => {
        backend("/get_fortune_wheel", auth()).then(setWheelExist)
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(input))

        const res = await backend("/create_fortune_wheel", auth(), input)
        console.log(res)
    }

    const handleChange = ({target}) => setInput(values => ({...values, [target.name]: target.value}))

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
                  <Form.Control type="number" name="commission" value={input.commission} onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                  <Form.Label>Winning Distribution</Form.Label>
                  <Form.Control type="text" name={'distribution'} value={input.distribution} onChange={handleChange}/>
              </FormGroup>
              <br/>
              <Button type='submit'> Create </Button>
          </Form>

      </div>
    );
}

export default WOF;
