import {Container} from "react-bootstrap";
import Ban from "./Ban";

export default function Users() {
    return <Container>
        <h2>Users</h2>
        <BanUser/>
    </Container>
}


function BanUser() {

    return (
        <div className='Users'>
            <Ban/>
        </div>
    )
}