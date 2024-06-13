import React, { useEffect } from "react";
import { useState } from "react";
import AccountNav from "../accountNav";
import {Button} from "react-bootstrap";
import '../sytles/admin.css';
import { Navigate } from "react-router-dom";
export default function AdminPage() {
    function StayValidation(){
        return <Navigate to="/stayValidation" />
    }
    return(

        <>
        <div>
            <AccountNav />
            <h1>Admin</h1>
        </div>
        <div>
            <Button variant="dark" onClick={StayValidation}>Voir les biens en attente</Button>
            <Button variant="dark">Valider les services</Button>
            <Button variant="dark">Valider les avis</Button>
        </div>


        </>
    )  
}