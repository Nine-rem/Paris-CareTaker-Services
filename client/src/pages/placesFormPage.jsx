import React from "react";

export default function PlacesFormPage() {
    return( 
        <div className="container my-5">
        <form onSubmit={addNewPlace}>
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

            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

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
            {preInput("Heure du Check-in et Check-out", "Indiquez les horaires d'arrivée et de départ de votre logement")}

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
            </div>
            <Button variant="dark" className="mt-4" type='submit'>Enregistrer</Button>
        </form>
        {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
    </div>
    );
}