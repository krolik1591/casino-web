import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";
import { MyInput } from "../../components/MyInput";


export default function CreateWheel() {
    const auth = useAuthUser()

    const [input, setInput] = useState({
        ticket_cost: 100,
        end_date: defaultDate(7),
        commission: 10,
        distribution: "70, 20, 10",
        winner_tickets_count: 0
    })

    const handleChange = ({ target }) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setInput((values) => ({ ...values, [target.name]: value }));
    };
    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            ticket_cost: input.ticket_cost,
            end_date: Math.floor(+new Date(input.end_date) / 1000),
            commission: input.commission,
            distribution: input.distribution.split(",").map(x => +x.trim()),
            admin_id: auth().id,
            winner_tickets_count: input.winner_tickets_count
        }
        alert(JSON.stringify(data))
        const res = await backend("/create_fortune_wheel", auth(), data)
        console.log(res)
    }


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
              <MyInput label={"Скіко виграшних білетів треба? Ви обрали: " + input.winner_tickets_count}>
              <Form.Range
                  name="winner_tickets_count"
                  value={input.winner_tickets_count}
                  onChange={handleChange}
                  min={0}
                  max={input.distribution.split(",").length}
              />
              </MyInput>

              <Button type='submit'> Create </Button>
          </Form>

      </div>
    );
}


function defaultDate(addDays) {
    const result = new Date();
    result.setDate(result.getDate() + addDays);
    return dateToISO(result)
}

export function dateToISO(date) {
    return date.toISOString().slice(0, 10) + "T00:00"
}