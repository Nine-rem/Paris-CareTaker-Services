import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import pmr from '../assets/images/pmr.png';
import animal from '../assets/images/animal.png';
import localisation from '../assets/images/localisation.png';
import surface from '../assets/images/surface.png';
import capacite from '../assets/images/capacite.png';
import price from '../assets/images/price.png';
import { UserContext } from '../userContext';
import axios from 'axios';
import {  differenceInCalendarDays, differenceInDays } from 'date-fns';

export default function StayPage() {
    const { id } = useParams();
    const [stayData, setStayData] = useState(null);
    const [stayPhotos, setStayPhotos] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const { user, ready } = useContext(UserContext);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    


    const url = 'http://localhost:5000';
    const urlPhoto = 'http://localhost/client/src/assets/images/stay/';
    const urlService = 'http://localhost/client/src/assets/images/equipment-service/';
    const urlEquipement = 'http://localhost/client/src/assets/images/equipment-service/';

    useEffect(() => {
        const fetchStayData = async () => {
            try {
                const response = await fetch(`${url}/bien/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des données.');
                }
                const data = await response.json();
                setStayData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchStayPhotos = async () => {
            try {
                const response = await fetch(`${url}/bien-photo/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des photos.');
                }
                const photos = await response.json();
                setStayPhotos(photos);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchEquipments = async () => {
            try {
                const response = await fetch(`${url}/bien-equipement/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des équipements.');
                }
                const equipmentData = await response.json();
                setEquipments(equipmentData);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await fetch(`${url}/bien-service/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des services.');
                }
                const serviceData = await response.json();
                setServices(serviceData);
            } catch (err) {
                setError(err.message);
            }
        };

        const checkOwnership = async () => {
            try {
                const response = await axios.get(`/bien-owner`);
                console.log(response.data);
                if (response.data.length > 0) {
                    setIsOwner(true);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération du propriétaire du bien :", err);
            }
        };

        fetchStayData();
        fetchStayPhotos();
        fetchEquipments();
        fetchServices();
        if (ready && user) {
            checkOwnership();
        }
        setLoading(false);
    }, [id, ready, user]);

    if (loading || !ready) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    const countRooms = stayPhotos.filter(photo => photo.nom_type_piece === 'Chambre').length;
    const getImagePath = (photo) => `${urlPhoto}${id}${photo.chemin_photo}`;
    const getServicePath = (service) => `${urlService}${service.id_service}.png`;
    const getEquipementPath = (equipment) => `${urlEquipement}equipement-${equipment.id_equipement}.png`;

    return (
        <div>
            <div id="stay-information" className="box lightgrey-box row vertical-align">
                {stayData && stayData.length > 0 && stayData.map((data) => (
                    <React.Fragment key={data.id_bien}>
                        <h1 className="centered-text display-5 fw-bold">{data.nom_bien}</h1>
                        <span className="bold-brown-text centered-text mb-5">{data.type_location_bien}</span>
                        <p>{data.description_bien}</p>
                        <p>
                            {data.PMR_ok_bien === 1 && <img src={pmr} alt="Accès PMR" title="Accès PMR" width="15px" style={{ marginRight: '13px' }} />}
                            {data.PMR_ok_bien === 1 && <span className="small-italic-text"> Accessible et adapté aux personnes à mobilité réduite</span>}
                            <br />
                            {data.animal_ok_bien === 1 && <img src={animal} alt="Pet friendly" title="Pet friendly" width="18px" style={{ marginRight: '10px' }} />}
                            {data.animal_ok_bien === 1 && <span className="small-italic-text"> Animaux de compagnie autorisés</span>}
                        </p>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="mt-4">
                                <img className="mb-2" src={localisation} alt="Localisation" title="Localisation" width="35px" style={{ marginRight: '10px', marginLeft: '40px' }} />
                                {data.ville_bien} ({data.cp_bien})
                                <img className="mb-2" src={surface} alt="Surface" title="Surface" width="35px" style={{ marginRight: '10px', marginLeft: '40px' }} />
                                {data.surface_bien} m²
                                <img className="mb-2" src={capacite} alt="Capacité" title="Capacité" width="35px" style={{ marginRight: '10px', marginLeft: '40px' }} />
                                {data.capacite_bien} personne(s) - {countRooms} chambre(s)
                                <img className="mb-2" src={price} alt="Tarif" title="Tarif" width="35px" style={{ marginRight: '10px', marginLeft: '40px' }} />
                                {data.tarif_bien} €/nuit
                                <p>Heure de départ : {data.heure_depart}</p>
                                <p>Heure d'arrivée : {data.heure_arrivee}</p>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
                <div className="d-flex justify-content-center align-items-center">
                    {stayData && stayData.length > 0 && stayData.map((data) => (
                    <div className='reservation-input'>
                        <div className='text-bold'> Prix: {data.tarif_bien} €/nuit</div>
                        <div className='reservation-input'>
                        <label>Check-in:</label>
                        <input type='date' className='reservation-input-field' value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                        </div>
                        <div className='reservation-input'>
                        <label>Check-out:</label>
                        <input type='date' className='reservation-input-field' value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                        </div>
                        <div className='reservation-input'>
                        <label>Nombre de voyageurs:</label>
                        <input type='number' className='reservation-input-field' value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
                        </div>

                    <Button className="btn btn-dark btn-hover-brown mt-5 mx-3">Réserver ce logement
                    {numberOfDays > 0 && <span> pour {numberOfDays * data.tarif_bien} €</span>}
                    </Button>
                    </div>
                    ))}
                    {user && user.isAdmin === 1 && <Button className="btn btn-success mt-5 mx-3">Valider</Button>}
                    {user && (user.isAdmin === 1 || isOwner) &&
                        <Button className="btn btn-danger mt-5 mx-3">Supprimer</Button>
                    }
                    {isOwner && 
                        <Link to={`/account/places/${id}/edit`}>
                            <Button className="btn btn-dark btn-hover-brown mt-5 mx-3">Modifier</Button>
                        </Link>
                    }
                </div>
            </div>

            <div id="stay-gallery" className="box row vertical-align">
                {stayPhotos.length > 0 ? (
                    stayPhotos.map((photo, index) => (
                        <React.Fragment key={index}>
                            <div className="col-md-8 align-self-center box-margin-right mb-3">
                                <img src={getImagePath(photo)} width="100%" alt={photo.nom_piece} />
                            </div>
                            <div className="col-md-4">
                                <h3 className="black-h3">{photo.nom_piece}</h3>
                                <p>{photo.description_piece}</p>
                            </div>
                        </React.Fragment>
                    ))
                ) : (
                    <p>Aucune photo trouvée.</p>
                )}
            </div>

            <div id="stay-equipment-service" className="box lightgrey-box row">
                <h2 className="centered-text">Votre confort, notre priorité !</h2>
                <p>Paris Caretaker Service vous propose des logements où chaque détail est pensé pour votre confort absolu. Dans ce logement, nous avons pris soin de vous offrir une expérience de vie harmonieuse et pratique, en mettant à votre disposition une panoplie d'équipements soigneusement sélectionnés. De plus, notre réseau de partenaires de confiance est à votre disposition pour faciliter votre séjour en vous proposant une gamme de services visant à rendre votre expérience encore plus agréable.</p>
                <div className="col-md-6 box-margin-right mt-4">
                    <h3 className="centered-text">Équipement(s) proposé(s) par ce logement</h3>
                    {equipments.length > 0 ? (
                        equipments.map((equipment) => (
                            <p key={equipment.id_equipement} style={{ fontWeight: '600' }}>
                                <img src={getEquipementPath(equipment)} alt={equipment.nom_equipement} title={equipment.nom_equipement} width="60px" style={{ marginRight: '10px' }} />
                                {equipment.nom_equipement}
                            </p>
                        ))
                    ) : (
                        <span style={{ display: 'block', textAlign: 'center' }} className="small-italic-text">Aucun équipement</span>
                    )}
                </div>
                <div className="col-md-6 mt-4">
                    <h3 className="centered-text">Service(s) proposé(s) par ce logement</h3>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <p key={service.id_service} style={{ fontWeight: '600' }}>
                                <img src={getServicePath(service)} alt={service.nom_service} title={service.nom_service} width="60px" style={{ marginRight: '10px' }} />
                                {service.nom_service}
                            </p>
                        ))
                    ) : (
                        <span style={{ display: 'block', textAlign: 'center' }} className="small-italic-text">Aucun service souscrit</span>
                    )}
                </div>
            </div>

            <div id="stay-reviews" className="box centered-text">
                <h2>Ce qu'ils en ont pensé</h2>
                <b style={{ color: 'red', fontWeight: '600' }}>AFFICHER AVIS + COMMENTAIRE</b>
            </div>
        </div>
    );
}