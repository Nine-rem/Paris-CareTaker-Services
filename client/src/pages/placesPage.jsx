import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import './../placesPage.css';
import Equipements from "../equipements";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [equipments, setEquipments] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState("1");

    function inputHeader(title) {
        return (
            <h2 className="">{title}</h2>
        );
    }

    function inputDescription(description) {
        return (
            <p className="text-muted small mt-4">{description}</p>
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

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        data.set('photos', files);
        axios.post('/upload', data, {
            headers: {'content-type' : 'multipart/form-data'}
        })

        .then((response) => {
            const{data} =response;
            setAddedPhotos(prev => [...prev, ...data]);
        })
        .catch((error) => {
            console.error("Erreur lors de l'envoi des photos :", error);
        });
    }


    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => [...prev, filename]);
        setPhotoLink(''); 
    }

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
                <div className="container my-5">
                    <form>
                        {preInput("Titre", "Ajoutez un nom à votre logement, il doit être court et concis")}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Nom du logement" className="form-control mb-3 mt-4"></input>
                        <h2>Adresse</h2>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Adresse" className="form-control mb-3"></input>
                        <input type="text" value={zipcode} onChange={ev => setZipcode(ev.target.value)} placeholder="Code postal" className="form-control mb-3"></input>
                        <input type="text" value={city} onChange={ev => setCity(ev.target.value)} placeholder="Ville" className="form-control mb-3"></input>

                        <h2>Photos</h2>
                        <div className="d-flex align-items-center">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="URL de la photo" className="form-control me-3"></input>
                            <Button variant="dark" onClick={addPhotoByLink}>Ajouter une photo</Button>
                        </div>
                        <div className="mt-3 photo-gallery">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div key={link}> 
                                    <img className="custom-image" src={`http://localhost:5000/uploads/${link}`} alt="" />
                                </div>
                            ))}
                        </div>
                        <Button className="add-button" as="label" htmlFor="file-input" variant="outline-dark">
                            <input id="file-input" type="file" className="d-none" onChange={uploadPhoto}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                            Importer des photos
                        </Button>
                        <h2>Description du logement</h2>
                        <textarea placeholder="Description du logement" value={description} onChange={ev => setDescription(ev.target.value)} className="form-control mb-3"></textarea>

                        {preInput("Équipements", "Sélectionnez les équipements disponibles dans votre logement")}
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            <Equipements selected={equipments} OnChange={setEquipments} />
                        </div>

                        <h2 className="text-2xl mt-4">Informations complémentaires</h2>
                        <textarea placeholder="Informations complémentaires" value={additionalInfo} onChange={ev => setAdditionalInfo(ev.target.value)} className="form-control mb-3"></textarea>
                        {preInput("Heure du Check-in et Check-out", "Indiquez les horaires d'arrivée et de départ de votre logement")}

                        <div className="d-flex gap-4">
                            <div>
                                <h3>Check-in</h3>
                                <input type="time" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} className="form-control"></input>
                            </div>
                            <div>
                                <h3>Check-out</h3>
                                <input type="time" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} className="form-control"></input>
                            </div>
                            <div>
                                <h3>Nombre maximum de voyageurs</h3>
                                <input type="text" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <Button variant="dark" className="mt-4">Enregistrer</Button>
                    </form>
                </div>
            )}
        </>
    );
}
