import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PlacesPhoto({ placeId }) {
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        axios.get(`/photo-cover/${placeId}`)
            .then((response) => {
                setPhoto(response.data);
                // console.log(response.data);

            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de la photo de couverture :", error);
            });
    }, [placeId]);

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={photo.url} alt={photo.alt} />
            {console.log(photo.url)}
        </div>
    );
}
