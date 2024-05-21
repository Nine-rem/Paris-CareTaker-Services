import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

export default function PhotoUploader({ addedPhotos, onChange }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [photoInfo, setPhotoInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms();
    }, []);

    function getRooms() {
        axios.get('/rooms')
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des pièces :", error);
            });
    }

    function uploadPhoto(ev) {
        ev.preventDefault();
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const info = photoInfo[file.name] || {};
            data.append('photos', file);
            data.append(`info[${file.name}][title]`, info.title || '');
            data.append(`info[${file.name}][room]`, info.room || '');
            data.append(`info[${file.name}][description]`, info.description || '');
            data.append(`info[${file.name}][room_size]`, info.room_size || '');
        }

        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            const { data: photoDetails } = response;
            onChange(prev => [...prev, ...photoDetails]);
            setPhotoInfo(prev => {
                const newInfo = { ...prev };
                photoDetails.forEach(photo => {
                    newInfo[photo.filename] = { title: '', room: '', description: '', room_size: '' };
                });
                return newInfo;
            });
            setSuccessMessage("Photos importées avec succès !");
            setErrorMessage("");
        })
        .catch((error) => {
            setErrorMessage("Erreur lors de l'envoi des photos.");
            setSuccessMessage("");
        });
    }

    function removePhoto(filename) {
        onChange(prev => prev.filter(photo => photo.filename !== filename));
        setPhotoInfo(prev => {
            const newInfo = { ...prev };
            delete newInfo[filename];
            return newInfo;
        });
        axios.delete(`/upload/${filename}`)
            .then(() => {
                setSuccessMessage("Photo supprimée avec succès !");
                setErrorMessage("");
            })
            .catch(() => {
                setErrorMessage("Erreur lors de la suppression de la photo.");
                setSuccessMessage("");
            });
    }

    function handleInfoChange(filename, key, value) {
        setPhotoInfo(prev => ({
            ...prev,
            [filename]: {
                ...prev[filename],
                [key]: value
            }
        }));
    }

    return (
        <div>
            <h2>Photos</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="mt-3 photo-gallery">
                {addedPhotos.length > 0 && addedPhotos.map(photo => (
                    <div key={photo.filename} className="photo-wrapper position-relative">
                        <img className="custom-image" src={`http://localhost:5000/uploads/${photo.filename}`} alt="" />
                        <Button variant="danger" className="remove-photo-btn" onClick={() => removePhoto(photo.filename)}>Supprimer</Button>
                        <div>
                            <Form.Group>
                                <h4>Titre</h4>
                                <Form.Control
                                    type="text"
                                    value={photoInfo[photo.filename]?.title || ''}
                                    onChange={(e) => handleInfoChange(photo.filename, 'title', e.target.value)}
                                    placeholder="Titre de la photo"
                                />
                            </Form.Group>
                            <Form.Group>
                                <h4>Pièce</h4>
                                <Form.Control
                                    as="select"
                                    value={photoInfo[photo.filename]?.room || ''}
                                    onChange={(e) => handleInfoChange(photo.filename, 'room', e.target.value)}
                                >
                                    <option value="">Sélectionner une pièce</option>
                                    {rooms.map(room => (
                                        <option key={room.id_type_piece} value={room.nom_type_piece}>{room.nom_type_piece}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <h4>Surface de la pièce</h4>
                                <Form.Control
                                    type="text"
                                    value={photoInfo[photo.filename]?.room_size || ''}
                                    onChange={(e) => handleInfoChange(photo.filename, 'room_size', e.target.value)}
                                    placeholder="Surface de la pièce en m²"
                                />
                            </Form.Group>
                            <Form.Group>
                                <h4>Description</h4>
                                <Form.Control
                                    as="textarea"
                                    value={photoInfo[photo.filename]?.description || ''}
                                    onChange={(e) => handleInfoChange(photo.filename, 'description', e.target.value)}
                                    placeholder="Description de la photo"
                                />
                            </Form.Group>
                        </div>
                    </div>
                ))}
            </div>
            <Button className="add-button mt-3 mb-3" as="label" htmlFor="file-input" variant="outline-dark">
                <input id="file-input" multiple type="file" className="d-none" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                Importer des photos
            </Button>
        </div>
    );
}
