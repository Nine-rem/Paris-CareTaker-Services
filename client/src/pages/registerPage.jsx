import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [siret, setSiret] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    function registerUser(ev) {
        ev.preventDefault();
        axios.post ('/register', {
            lastName,
            firstName,
            birthdate,
            address,
            postalCode,
            city,
            email,
            password,
            confirmPassword,
            siret,
            phoneNumber,
            role,
            company
        })

    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }
    
    

    return (
        <div id = "register" className="d-flex justify-content-center align-items-center">
            <div id="signup" className="box w-80">
                <h1 className="text-4xl text-center mb-4">Inscription</h1>

                <Form onSubmit={registerUser}>
                    {/* Champ Nom */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextLastName">
                        <Form.Label column sm="2">
                            Nom
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="nom" required="required"
                            value={lastName} 
                            onChange={ev => setLastName(ev.target.value)} />
                        </Col>
                    </Form.Group>

                    {/* Champ Prénom */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextFirstName">
                        <Form.Label column sm="2">
                            Prénom
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Prénom" required="required"
                            value={firstName}
                            onChange={ev => setFirstName(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Champ Date de naissance */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextBirthdate">
                        <Form.Label column sm="2">
                            Date de naissance
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="date" required="required"
                            value={birthdate}
                            onChange={ev => setBirthdate(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Champ Adresse */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAdress">
                    <Form.Label column sm="2">
                        Adresse
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Adresse" required="required"
                        value={address}
                        onChange={ev => setAddress(ev.target.value)}
                        />
                    </Col>
                    </Form.Group>

                    {/* Champ Ville */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextCity">
                        <Form.Label column sm="2">Ville</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Ville" required="required"
                                value={city}
                                onChange={ev => setCity(ev.target.value)} 
                            />
                        </Col>
                    </Form.Group>
                    {/* Champ Code postal*/}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPostalCode">
                        <Form.Label column sm="2">
                            Code postal
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Code postal" required="required"
                            value={postalCode}
                            onChange={ev => setPostalCode(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    


                    {/* Champ téléphone */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone">
                        <Form.Label column sm="2">
                            numéro de téléphone
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="numéro de téléphone" required="required"
                            value={phoneNumber}
                            onChange={ev => setphoneNumber(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>



                    

                    {/* Champ Email */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="your@email.com" required="required"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Champ Mot de passe */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Mot de passe
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Mot de passe" required="required"
                            value={password}    
                            onChange={ev => setPassword(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Champ Mot de passe */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPasswordConfirm">
                        <Form.Label column sm="2">
                            Confirmez votre mot de passe
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Mot de passe de confirmation" required="required"
                            value={confirmPassword}
                            onChange={ev => setConfirmPassword(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Sélection du rôle */}
                    <Form.Group as={Row} className="mb-3" controlId="formRole">
                        <Form.Label column sm="2">
                            Rôle
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" value={role} onChange={handleRoleChange} required="required">
                                <option value="">-- Choisissez un rôle --</option>
                                <option value="traveler">Voyageur</option>
                                <option value="landlord">Bailleur</option>
                                <option value="serviceProvider">Prestataire</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/* Champs supplémentaires basés sur le rôle */}

                    {role === "serviceProvider" && (
                <>

                    {/* Champ nom de société*/}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextCompany">
                        <Form.Label column sm="2">
                            Entreprise
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Nom de l'entreprise" 
                            value={company}
                            onChange={ev => setCompany(ev.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    {/* Champ SIRET */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextSiret">
                        <Form.Label column sm="2">SIRET</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text" 
                                placeholder="SIRET" 
                                value={siret}
                                onChange={ev => setSiret(ev.target.value)} 
                            />
                        </Col>
                    </Form.Group>

                </>
                    
            )}

                    {/* Bouton d'inscription */}
                    <Row>
                        <Col sm="12">
                            <Button variant="primary" type="submit" className="w-100">S'inscrire</Button>
                        </Col>
                    </Row>
                    <div className='text-black-50'>
                            vous avez déjà un compte ?
                            <Link to={'/login'} className = "text-dark">Connectez-vous</Link>
                        </div>
                </Form>
            </div>
        </div>
    );
}
