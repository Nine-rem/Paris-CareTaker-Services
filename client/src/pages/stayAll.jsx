import React, { useState, useEffect } from 'react';
import pmr from '../assets/images/pmr.png';
import animal from '../assets/images/animal.png';

export default function StayAll() {
    const [biens, setBiens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        fetch('http://localhost:5000/bien')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des données.');
                }
                return response.json();
            })
            .then((data) => {
                setBiens(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
                                        <th>Location</th>
                                        <th>Type de location</th>
                                        <th>Capacité</th>
                                        <th>Surface (m²)</th>
                                        <th>Localisation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {biens.length > 0 ? (
                                        biens.map((bien, index) => (
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    {bien.nom_bien}{' '}
                                                    {bien.PMR_ok_bien && <img src={pmr} alt="Accès PMR" title="Accès PMR" width="15px" />}
                                                    {bien.animal_ok_bien && <img src={animal} alt="Pet friendly" title="Pet friendly" width="17px" />}
                                                </td>
                                                <td className="align-middle">{bien.nom_bien}</td>
                                                <td className="align-middle">{bien.type_location_bien}</td>
                                                <td className="align-middle">{bien.capacite_bien}</td>
                                                <td className="align-middle">{bien.surface_bien}m²</td>
                                                <td className="align-middle">{bien.ville_bien} ({bien.cp_bien})</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5">Aucune location trouvée.</td></tr>
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
