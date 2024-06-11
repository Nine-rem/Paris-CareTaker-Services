import React from "react";
import { useState } from "react";
import { Link, Navigate,useParams } from "react-router-dom";
import axios from "axios";


export default function BookingPage() {
    return(
        <>
        const { id } = useParams();

        <h1>Ma réservation</h1>
        <h2>Numéro de réservation : {id}</h2>

        </>
    )
}
