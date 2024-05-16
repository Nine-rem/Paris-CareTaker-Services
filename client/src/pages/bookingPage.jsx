import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../accountNav";

export default function BookingPage() {
    return(
        <>
        <AccountNav />
        <h1>Booking Page</h1>
        </>
    )
}
