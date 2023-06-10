import React, {useEffect} from 'react';
import {backend} from "../../helpers/backend";
import {useAuthUser} from "react-auth-kit";
import ShowTickets from "./ShowTickects";
import CreateWheel from "./CreateWheel";

function WOF() {
    const auth = useAuthUser()
    const [wheel, setWheel] = React.useState(undefined)

    useEffect(() => {
        backend("/get_fortune_wheel", auth()).then(setWheel)
    }, [])


    if (wheel)
        return <ShowWheel info={wheel}/>
    return <CreateWheel/>
}


function ShowWheel({info}) {
    const wheel = info.wheel;
    return (
      <div className="container">
          <h1> Current wheel of fortune: </h1>
          <p> Ticket cost: {wheel.ticket_cost} </p>
          <p> Commission: {wheel.commission} </p>
          <p> Rewards: {wheel.rewards} </p>
          <p> Winners: {wheel.winners} </p>
          <p> Creation date: {wheel.timestamp_start} </p>
          <p> End date: {wheel.timestamp_end} </p>
          <ShowTickets tickets={info.tickets}/>
      </div>
    )
}


export default WOF;
