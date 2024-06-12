import React from "react";
import { useState } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";



export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(booking => booking.id_reservation === parseInt(id));
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            }).catch(error => {
                console.error('Erreur lors de la récupération de la réservation :', error);
            });
        }
    }, [id]);
    return(
        <>

        <h1>Ma réservation</h1>
        <h2>Numéro de réservation : {id}</h2>

        </>
    )
}
