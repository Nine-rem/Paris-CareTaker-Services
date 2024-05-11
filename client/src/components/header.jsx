import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import iconDark from '../assets/logos/icon_dark.png';
import titleDark from '../assets/logos/title_dark.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
    <>
    <header>
        <div className="row p-3 d-flex justify-content-center align-items-center">
            <div className="col-2">
            {/* <!-- Barre de navigation --> */}
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarLight">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbarLight">
                    <div className="offcanvas-header">
                    {/* <!-- Image du menu --> */}
                    <Link to="/"><img src={iconDark} alt="Icon" className="img-fluid" width="50px"></img></Link>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Accueil</a>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Votre compte
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Votre profil</a></li>
                            <li><a className="dropdown-item" href="#">Vos documents</a></li>
                            <li><a className="dropdown-item" href="#">Vos comptes</a></li>
                            <li><a className="dropdown-item" href="#">Vos réservations</a></li>
                            <li><a className="dropdown-item" href="#">Logements favoris</a></li>
                        </ul>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Espace bailleur
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Nouveau bien</a></li>                        
                            <li><a className="dropdown-item" href="#">Vos biens</a></li>
                            <li><a className="dropdown-item" href="#">Réservations</a></li>
                            <li><a className="dropdown-item" href="#">Vos interventions</a></li>
                        </ul>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Espace prestataire
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Nouvelle prestations</a></li>
                            <li><a className="dropdown-item" href="#">Vos prestations</a></li>
                            <li><a className="dropdown-item" href="#">Vos interventions</a></li>
                        </ul>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Espace administrateur
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Utilisateurs</a></li>
                            <li><a className="dropdown-item" href="#">Biens</a></li>
                            <li><a className="dropdown-item" href="#">Services</a></li>
                            <li><a className="dropdown-item" href="#">Demandes en attente</a></li>
                            <li><a className="dropdown-item" href="#">Documents</a></li>
                            <li><a className="dropdown-item" href="#">Gestion technique</a></li>
                        </ul>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Trouvez un logement</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Trouvez un service</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Messagerie</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Devenir Premium</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Connectez-vous</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Nous rejoindre</a>
                        </li>
                    </ul>
                    {/* <!-- Barre de recherche --> */}
                    <form className="d-flex mt-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="Tapez votre recherche" aria-label="Search"></input>
                        <button className="btn btn-dark" type="submit">Rechercher</button>
                    </form>
                    </div>
                </div>
                </div>
            </nav>
            </div>
            <div className="col text-center">
            {/* <!-- Titre --> */}
            <Link to="/">
            <img src={titleDark} width="200px"></img>
            </Link>
            </div>
            <div className="col-2 text-end d-none d-md-block">
            {/* <!-- Bouton de connexion/inscription --> */}
            <Link to={"login"}><button type="button" className="btn btn-dark">Connexion</button></Link>
            <Link to={"register"}><button type="button" className="btn btn-dark">Inscription</button></Link>
            </div>
        </div>
        {/* <!-- Séparateur --> */}
        <div className="brown-separator"></div>
        </header>
    </>
    );
}

export default Header;
