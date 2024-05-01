import React from 'react';

function Header() {
    return (
        <>
            <header>
                <div className="row p-3 d-flex justify-content-center align-items-center">
                    <div className="col-2">
                        <nav className="navbar bg-body-tertiary">
                            <div className="container-fluid">
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarLight">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbarLight">
                                    <div className="offcanvas-header">
                                        <img src="../assets/logos/icon_dark.png" alt="Icon" className="img-fluid" width="50px"/>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="#">Accueil</a>
                                            </li>
                                            {/* Additional menu items */}
                                        </ul>
                                        <form className="d-flex mt-3" role="search">
                                            <input className="form-control me-2" type="search" placeholder="Tapez votre recherche" aria-label="Search"/>
                                            <button className="btn btn-dark" type="submit">Rechercher</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col text-center">
                        <img src="../assets/logos/title_dark.png" width="200px"/>
                    </div>
                    <div className="col-2 text-end d-none d-md-block">
                        <button type="button" className="btn btn-dark">Connexion</button>
                        <button type="button" className="btn btn-dark">Inscription</button>
                    </div>
                </div>
                <div className="brown-separator"></div>
            </header>
        </>
    );
}

export default Header;
