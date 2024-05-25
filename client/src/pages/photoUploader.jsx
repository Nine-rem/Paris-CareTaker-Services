import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PhotoUploader({ addedPhotos, onChange }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [pieces, setPieces] = useState([]);

    const handlePieceChange = (index, e) => {
        const { name, value } = e.target;
        const newPieces = [...pieces];
        newPieces[index][name] = value;
        setPieces(newPieces);
        onChange(newPieces);
    };

    const handlePhotoChange = (pieceIndex, photoIndex, e) => {
        const { name, value } = e.target;
        const newPieces = [...pieces];
        newPieces[pieceIndex].photos[photoIndex][name] = value;
        setPieces(newPieces);
        onChange(newPieces);
    };

    const addPieceAndPhoto = (files) => {
        const newPiece = {
            nom_piece: '',
            description_piece: '',
            est_privatif_piece: '',
            surface_piece: '',
            type_piece: '',
            photos: Array.from(files).map(file => ({
                nom_photo: file.name,
                description_photo: '',
                chemin_photo: URL.createObjectURL(file),
                est_couverture: 1
            }))
        };
        const newPieces = [...pieces, newPiece];
        setPieces(newPieces);
        onChange(newPieces);
    };

    const handleFileChange = (ev, pieceIndex) => {
        const files = ev.target.files;
        if (files.length > 0) {
            addPieceAndPhoto(files);
        }
    };

    const removePhoto = (pieceIndex, photoIndex) => {
        const newPieces = [...pieces];
        newPieces[pieceIndex].photos.splice(photoIndex, 1);
        setPieces(newPieces);
        onChange(newPieces);
    };

    const addNewPiece = () => {
        setPieces([...pieces, {
            nom_piece: '',
            description_piece: '',
            est_privatif_piece: '',
            surface_piece: '',
            type_piece: '',
            photos: []
        }]);
    };

    return (
        <div>
            <h2>Photos</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <Button className="add-button mt-3 mb-3" onClick={addNewPiece} variant="outline-dark">
                Ajouter une nouvelle pièce
            </Button>
            {pieces.map((piece, pieceIndex) => (
                <div key={pieceIndex}>
                    <h3>Pièce {pieceIndex + 1}</h3>
                    <Form.Group>
                        <Form.Control type="text" name="nom_piece" placeholder="Nom Pièce" onChange={(e) => handlePieceChange(pieceIndex, e)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="description_piece" placeholder="Description Pièce" onChange={(e) => handlePieceChange(pieceIndex, e)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="number" name="est_privatif_piece" placeholder="Est Privatif" onChange={(e) => handlePieceChange(pieceIndex, e)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="number" name="surface_piece" placeholder="Surface Pièce" onChange={(e) => handlePieceChange(pieceIndex, e)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="number" name="type_piece" placeholder="Type Pièce" onChange={(e) => handlePieceChange(pieceIndex, e)} required />
                    </Form.Group>
                    <h4>Photos</h4>
                    <Button className="add-button mt-3 mb-3" as="label" htmlFor={`file-input-${pieceIndex}`} variant="outline-dark">
                        <input id={`file-input-${pieceIndex}`} multiple type="file" className="d-none" onChange={(ev) => handleFileChange(ev, pieceIndex)} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>
                        Importer des photos
                    </Button>
                    {piece.photos.map((photo, photoIndex) => (
                        <div key={photoIndex} className="photo-wrapper position-relative">
                            <img className="custom-image" src={photo.chemin_photo} alt="" />
                            <Form.Group>
                                <Form.Control type="text" name="nom_photo" placeholder="Nom Photo" value={photo.nom_photo} onChange={(e) => handlePhotoChange(pieceIndex, photoIndex, e)} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" name="description_photo" placeholder="Description Photo" onChange={(e) => handlePhotoChange(pieceIndex, photoIndex, e)} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" name="chemin_photo" placeholder="Chemin Photo" value={photo.chemin_photo} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="number" name="est_couverture" placeholder="Est Couverture" value={photo.est_couverture} onChange={(e) => handlePhotoChange(pieceIndex, photoIndex, e)} required />
                            </Form.Group>
                            <Button variant="danger" className="remove-photo-btn" onClick={() => removePhoto(pieceIndex, photoIndex)}>Supprimer</Button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
