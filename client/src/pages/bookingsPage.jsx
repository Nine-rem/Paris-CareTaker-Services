import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../accountNav";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings')
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des réservations :", error);
            });
    }, []);

    return(
        <>
        <AccountNav />
        <h1>Mes réservations</h1>
        <div>
            {bookings?.length > 0 && bookings.map(booking => (
                <div key={booking.id_reservation}>
                    <h2>Réservation n°{booking.id_reservation}</h2>
                    <p>Bien reservé: {booking.bien_reserve}</p>
                    <p>Date de début : {booking.date_debut_reservation}</p>
                    <p>Date de fin : {booking.date_fin_reservation}</p>
                    <p>Nombre de voyageurs : {booking.nb_voyageurs}</p>
                    <p>Montant total : {booking.prix_total} €</p>
                    <Link to={`/account/bookings/${booking.id_reservation}`}>Voir les détails</Link>
                </div>
            ))}
        </div>
        </>
    )
}