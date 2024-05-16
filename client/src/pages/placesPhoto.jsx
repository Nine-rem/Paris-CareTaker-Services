import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PlacesPhoto() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        async function fetchPlace() {
            const { data } = await axios.get(`/bien-photo/${id}`);
            setPlace(data);
            setPhoto(data.photos[0]);
        }
        fetchPlace();
    }, [id]);
    if (!place) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div id="placesPhoto" className="box">
                <h2>{place.name}</h2>
                <img src={photo} alt={place.name} />
            </div>
        </>
    );
}