import { Link, useParams } from "react-router-dom";
import React from "react";
import Button from 'react-bootstrap/Button';
import './../placesPage.css'; // Ensure this is imported only once

export default function PlacesPage() {
    const { action } = useParams();

    return (
        <>
            {action !== 'new' && (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <Link to="/account/places/new" className="link-no-underline">
                            <Button variant="dark" size="sm" className="d-flex align-items-center justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm me-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Ajouter un logement
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2>Titre</h2>
                        <p className="text-muted small mt-4">Ajoutez un nom à votre logement, il doit être court et concis</p>
                        <input type="text" placeholder="Nom du logement" className="form-control mb-3 mt-4"></input>
                        <h2>Adresse</h2>
                        <input type="text" placeholder="Adresse" className="form-control mb-3"></input>
                        <h2>Photos</h2>
                        <div className="d-flex align-items-center">
                            <input type="text" placeholder="URL de la photo" className="form-control me-6"></input>
                            <Button variant="dark">Ajouter une photo</Button>
                        </div>
                        <div className="mt-3">
                            <Button className="add-button add-button-custom" variant="outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                                Importer des photos
                            </Button>
                        </div>
                        <h2>Description du logement</h2>
                        <textarea placeholder="Description du logement" className="form-control mb-3"></textarea>
                        <h2>Perks</h2>
                        
                    </form>
                </div>
            )}
        </>
    );
}
