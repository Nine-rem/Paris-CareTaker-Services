import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './equipement.css';  // Assurez-vous que le chemin est correct

export default function Equipements({ selected, onChange }) {
    const [equipements, setEquipements] = useState([]);
    const urlEquipement = 'http://localhost/client/src/assets/images/equipment-service/';

    useEffect(() => {
        const fetchEquipements = async () => {
            try {
                const response = await axios.get('/equipements'); 
                setEquipements(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des équipements :", error);
            }
        };
        fetchEquipements();
    }, []);

    const handleClick = (ev) => {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange(selected.filter(selectedName => selectedName !== name));
        }
    };

    const getEquipementPath = (equipment) => `${urlEquipement}equipement-${equipment.id_equipement}.png`;

    return (
        <div className="equipements-container">
            {equipements.map((equipement) => (
                <label key={equipement.id_equipement} className="equipement-checkbox">
                    <input
                        type="checkbox"
                        name={equipement.nom_equipement}
                        checked={selected.includes(equipement.nom_equipement)}
                        onChange={handleClick}
                    />
                    <div className="checkbox-content">
                        <img className="equipement-icon" src={getEquipementPath(equipement)} alt={equipement.nom_equipement} />
                        <span className="equipement-label">{equipement.nom_equipement}</span>
                    </div>
                </label>
            ))}
        </div>
    );
}
