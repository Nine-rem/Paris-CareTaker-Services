import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useState } from "react";

export default function PhotoUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        try {
            const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink('');
            setSuccessMessage("Photo ajoutée avec succès !");
        } catch (error) {
            setErrorMessage("Erreur lors de l'ajout de la photo.");
        }
    }
    
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
            .then((response) => {
                const { data: filenames } = response;
                onChange(prev => [...prev, ...filenames]);
                setSuccessMessage("Photos importées avec succès !");
            })
            .catch((error) => {
                setErrorMessage("Erreur lors de l'envoi des photos.");
            });
    }

    function removePhoto(filename) {
        onChange(prev => prev.filter(photo => photo !== filename));
    }
    return (
        <div>
            <h2>Photos</h2>
        <div className="d-flex align-items-center">
            <Form.Control type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="URL de la photo" className="me-3" />
            <Button variant="dark" onClick={addPhotoByLink}>Ajouter une photo</Button>
        </div>
        <div className="mt-3 photo-gallery">
            {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div key={link} className="photo-wrapper position-relative">
                    <img className="custom-image" src={`http://localhost:5000/uploads/${link}`} alt="" />
                    <Button variant="danger" className="remove-photo-btn" onClick={() => removePhoto(link)}>Supprimer</Button>
                </div>
            ))}
        </div>
        <Button className="add-button" as="label" htmlFor="file-input" variant="outline-dark">
            <input id="file-input" multiple type="file" className="d-none" onChange={uploadPhoto} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
            Importer des photos
        </Button>
        </div>
    );  
}