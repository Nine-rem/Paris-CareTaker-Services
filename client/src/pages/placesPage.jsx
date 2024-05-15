import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './../placesPage.css';
import Equipements from "./equipements";  
import axios from "axios";
import PhotoUploader from "./photoUploader";
import PlacesFormPage from "./placesFormPage";

export default function PlacesPage() {
    const { action } = useParams();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (redirect) {
            return <Navigate to="/account/places" />;
        }
    }, [redirect]);




    return (
        <>
            {redirect && <Navigate to="/account/places" />}
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
               <PlacesFormPage/>
            )}
        </>
    );
}
