import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import pmr from '../assets/images/pmr.png';
import animal from '../assets/images/animal.png';
import axios from 'axios';
import { UserContext } from '../userContext';

export default function StayAll() {
    const [biens, setBiens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, ready } = useContext(UserContext);

    useEffect(() => {
        if (user && user.isAdmin === 0) {
            axios.get('/bien-validated')
                .then((response) => {
                    setBiens(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else if (user && user.isAdmin === 1) {
            axios.get('/bien')
                .then((response) => {
                    setBiens(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [user]);

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (ready && !user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <div id="hero-principal-image" className="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary hero-position">
                <div className="py-5 box-margin-left">
                    <h1 className="display-5 fw-bold">Catalogue des biens</h1>
                </div>
            </div>
            <div id="search-stay" className="box centered-text">
                <h2>Trouvez la location de vos rêves !</h2>
            </div>
            <div id="all-stays" className="box lightgrey-box row">
                <div className="col-md-12">
                    <h2>Toutes les locations</h2>
                    <div className="table-responsive">
                        {loading ? (
                            <p>Chargement...</p>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Nom</th>
                                        <th>Type de location</th>
                                        <th>Capacité</th>
                                        <th>Surface (m²)</th>
                                        <th>Localisation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {biens.length > 0 ? (
                                        biens.map((bien, index) => (
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    {bien.nom_bien}{' '}
                                                    {bien.PMR_ok_bien === 1 && <img src={pmr} alt="Accès PMR" title="Accès PMR" width="15px" />}
                                                    {bien.animal_ok_bien === 1 && <img src={animal} alt="Pet friendly" title="Pet friendly" width="17px" />}
                                                </td>
                                                <td className="align-middle">{bien.type_location_bien}</td>
                                                <td className="align-middle">{bien.capacite_bien}</td>
                                                <td className="align-middle">{bien.surface_bien}m²</td>
                                                <td className="align-middle">{bien.ville_bien} ({bien.cp_bien})</td>
                                                <td className="align-middle">
                                                    <Link to={`/account/places/${bien.id_bien}`}>
                                                        <Button variant="primary">Voir</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6">Aucune location trouvée.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
