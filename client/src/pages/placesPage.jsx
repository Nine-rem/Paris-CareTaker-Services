import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './../placesPage.css';
import AccountNav from "../accountNav";
import axios from "axios";


export default function PlacesPage() {
    const [places, setPlaces] = useState([]);


    useEffect(() => {
        axios.get('/places')
            .then((response) => {
                setPlaces(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des logements :", error);
            });
    }, []);

    return (
        <>
            <AccountNav />
            <Container className="my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Mes logements</h2>
                    <Link to="/account/places/new" className="link-no-underline">
                        <Button variant="dark" size="sm" className="d-flex align-items-center justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm me-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Ajouter un logement
                        </Button>
                    </Link>
                </div>
                <Row>
                    {places.length > 0 ? (
                        places.map(place => {

                            const couverturePhoto = place.photos?.find(photo => photo.est_couverture);

                            return (
                                <Col md={4} key={place.id_bien} className="mb-4">
                                    <Card className="property-card">
                                        {couverturePhoto && couverturePhoto.chemin_photo && (
                                            <Card.Img
                                                variant="top"
                                                src={`http://localhost:5000/client/src/assets/images/stay/${place.id_bien}${couverturePhoto.chemin_photo}`}
                                                alt={place.nom_bien}
                                                className="property-card-img"
                                            />
                                        )}
                                        <Card.Body>
                                            <Card.Title>{place.nom_bien}</Card.Title>
                                            <Card.Text>
                                                <strong>{place.tarif_bien} € / nuit</strong>
                                            </Card.Text>
                                            <div className="d-flex justify-content-between">
                                                <Link to={`/account/places/${place.id_bien}`} className="btn btn-dark btn-sm">
                                                    Voir
                                                </Link>
                                                <Link to={`/account/places/${place.id_bien}/edit`} className="btn btn-dark btn-sm">
                                                    Modifier
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center">
                            <p>Aucun logement trouvé.</p>
                        </div>
                    )}
                </Row>
            </Container>
        </>
    );
}
