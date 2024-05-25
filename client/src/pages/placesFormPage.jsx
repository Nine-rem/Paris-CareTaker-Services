import { React, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Equipements from "./equipements";
import PhotoUploader from "./photoUploader";
import axios from "axios";
import AccountNav from "../accountNav";
import { Navigate, Link, useParams } from "react-router-dom";
import animal from '../assets/images/animal.png';
import pmrs from '../assets/images/pmr.png';

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [equipments, setEquipments] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState("1");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [pricePerNight, setPricePerNight] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [pmr, setPmr] = useState(false);
    const [animals, setAnimals] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            const data = response.data;
            console.log(data);
            setTitle(data.nom_bien);
            setAddress(data.adresse_bien);
            setZipcode(data.cp_bien);
            setCity(data.ville_bien);
            // setAddedPhotos(data.photos); // Ajoutez cette ligne si vous avez les photos dans les données
            setDescription(data.description_bien);
            setEquipments(data.equipements.map(equip => equip.nom_equipement));
            setAdditionalInfo(data.information_supplementaire);
            setCheckIn(data.heure_arrivee);
            setCheckOut(data.heure_depart);
            setMaxGuests(data.capacite_bien);
            setPricePerNight(data.tarif_bien);
            console.log("pmr",data.PMR_ok_bien);
            console.log("animaux",data.animal_ok_bien);
            if (data.PMR_ok_bien === 1) {
                setPmr(true);
            }else{
                setPmr(false);
            }
            if (data.animal_ok_bien === 1) {
                setAnimals(true);
            }else{
                setAnimals(false);
            }
        }).catch((error) => {
            console.error("Erreur lors de la récupération des données du bien :", error);
            setErrorMessage("Erreur lors de la récupération des données du bien");
        });
    }, [id]);

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title,
            address,
            zipcode,
            city,
            addedPhotos,
            description,
            equipments,
            additionalInfo,
            checkIn,
            checkOut,
            maxGuests,
            pricePerNight,
            pmr,
            animals
        };

        console.log(id, placeData);
        if (id) {
            // Update
            try {
                await axios.put(`/places/${id}`, placeData);
                setSuccessMessage('Bien modifié avec succès.');
                setRedirect(true);
            } catch (error) {
                if (error.response) {
                    console.log("Response data:", error.response.data);
                    console.log("Response status:", error.response.status);
                    console.log("Response headers:", error.response.headers);
                    setErrorMessage(`Erreur lors de la modification du bien réponse : ${error.response.data.message || error.response.status}`);
                } else if (error.request) {
                    // console.log("Request data:", error.request);
                    setErrorMessage("Aucune réponse reçue du serveur.");
                } else {
                    console.log("Error message:", error.message);
                    setErrorMessage(`Erreur lors de la modification du bien message : ${error.message}`);
                }
            }

        } else {
            try {
                await axios.post('/places', placeData);
                setSuccessMessage('Bien créé avec succès.');
                setRedirect(true);
            } catch (error) {
                if (error.response) {
                    // console.log("Response data:", error.response.data);
                    // console.log("Response status:", error.response.status);
                    // console.log("Response headers:", error.response.headers);
                    setErrorMessage(`Erreur lors de la création du bien : ${error.response.data.message || error.response.status}`);
                } else if (error.request) {
                    // console.log("Request data:", error.request);
                    setErrorMessage("Aucune réponse reçue du serveur.");
                } else {
                    // console.log("Error message:", error.message);
                    setErrorMessage(`Erreur lors de la création du bien : ${error.message}`);
                }
            }
        }
    }

    function inputHeader(title) {
        return (
            <h2>{title}</h2>
        );
    }

    function inputDescription(description) {
        return (
            <p className="text-muted small mt-2">{description}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    if (redirect) {
        return <Navigate to="/account/places" />;
    }

    return (
        <div>
            <AccountNav />
            <div className="container my-5">
                <form onSubmit={savePlace}>
                    {preInput("Titre", "Ajoutez un nom à votre logement, il doit être court et concis")}
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Nom du logement" />
                    </Form.Group>
                    <h2>Adresse</h2>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Adresse" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={zipcode} onChange={ev => setZipcode(ev.target.value)} placeholder="Code postal" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={city} onChange={ev => setCity(ev.target.value)} placeholder="Ville" />
                    </Form.Group>

                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <h2>Description du logement</h2>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="Description du logement" value={description} onChange={ev => setDescription(ev.target.value)} />
                    </Form.Group>

                    {preInput("Équipements", "Sélectionnez les équipements disponibles dans votre logement")}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <Equipements selected={equipments} onChange={setEquipments} />
                    </div>

                    <h2 className="text-2xl mt-4">Informations complémentaires</h2>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="Informations complémentaires" value={additionalInfo} onChange={ev => setAdditionalInfo(ev.target.value)} />
                    </Form.Group>
                    {preInput("Information pour les voyageurs", "Indiquez les horaires d'arrivée et de départ de votre logement ainsi que le nombre maximum de voyageurs et le prix par nuit.")}

                    <div className="d-flex gap-4">
                        <div>
                            <h3>Check-in</h3>
                            <Form.Group>
                                <Form.Control type="time" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                            </Form.Group>
                        </div>
                        <div>
                            <h3>Check-out</h3>
                            <Form.Group>
                                <Form.Control type="time" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                            </Form.Group>
                        </div>
                        <div>
                            <h3>Nombre maximum de voyageurs</h3>
                            <Form.Group>
                                <Form.Control type="text" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                            </Form.Group>
                        </div>
                        <div>
                            <h3>Prix par nuit</h3>
                            <Form.Group>
                                <Form.Control type="text" value={pricePerNight} onChange={ev => setPricePerNight(ev.target.value)} />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="d-flex gap-4">
                        <div>
                            <h3>Accès PMR</h3>
                            <Form.Group>
                                <Form.Check type="checkbox" checked={pmr} onChange={ev => setPmr(ev.target.checked)} />
                                <img src={pmrs} alt="pmr" />
                            </Form.Group>
                        </div>
                        <div>
                            <h3>Accepte les animaux</h3>
                            <Form.Group>
                                <Form.Check type="checkbox" checked={animals} onChange={ev => setAnimals(ev.target.checked)} />
                                <img src={animal} alt="animal" />
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="dark" className="mt-4" type='submit'>Enregistrer</Button>
                </form>
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                {successMessage && (
                    <Link to="/account/places">
                        <Alert variant="success" className="mt-3 clickable">
                            {successMessage}
                            <div>Cliquez pour revenir à la page de vos biens</div>
                        </Alert>
                    </Link>)
                }

            </div>
        </div>
    );
}
