import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './../placesPage.css';
import AccountNav from "../accountNav";
import axios from "axios";
import PlacesPhoto from "./placesPhoto";

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
            <div className="container my-5">
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
                <div className="row-2">
                    {places.length > 0 ? (
                        places.map(place => (
                            <div key={place.id_bien} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h3 className="card-title">{place.nom_bien}</h3>
                                        <div>
                                            <PlacesPhoto placeId={place.id_bien} />
                                        </div>
                                        <p className="card-text">{place.adresse_bien}, {place.cp_bien}, {place.ville_bien}</p>
                                        <Link to={`/account/places/${place.id_bien}`} className="mt-auto">
                                            <Button variant="dark" size="sm">Voir</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>Aucun logement trouvé.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
