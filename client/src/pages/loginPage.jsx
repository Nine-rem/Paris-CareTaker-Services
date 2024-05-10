import Button from 'react-bootstrap/Button';
import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        axios.post('/login', {
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response);
        }
        )
        .catch((error) => {
            console.error('Error during login:', error);
        });
    }

    return (
        <>
            <div id="login" className="container">
                <div className="box centered-text">
                    <h1 className="text-4xl text-center">Connexion</h1>

                    <Form onSubmit={handleLoginSubmit} >
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" placeholder="votre@email.com" 
                                value={email}$
                                onChange={(ev) => setEmail(ev.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Mot de passe
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Mot de passe" 
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="dark" type="submit">Se connecter</Button>
                        <div className='text-black-50'>
                            Pas encore de compte ?
                            <Link to={'/register'} className = "text-dark">Inscrivez-vous</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
