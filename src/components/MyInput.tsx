import {Container, Form, InputGroup} from "react-bootstrap";
import React from "react";

export function MyInput({children, label}) {
    return <Container>
        <Form.Label>{label}</Form.Label>
        <InputGroup className="mb-3">
            {children}
        </InputGroup>
    </Container>
}
