import React from "react";
import Button from 'react-bootstrap/Button';
import { Link, useLocation,Navigate } from "react-router-dom";
import './placesPage.css';
import userProfile from './assets/images/user.png';
import { UserContext } from './userContext.jsx';
import { useContext } from "react";


export default function AccountNav() {
    const { user,ready } = useContext(UserContext);
    const pathName = useLocation();
    let subpage = pathName.pathname.split('/')[2];

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (ready && !user) {
        return <Navigate to="/login" />;
    }


    function isAdmin(user) {
        if (user && user.isAdmin === 0) {
            return false;
        } else if (user && user.isAdmin === 1) {
            return true;
        }
        else {
            return false;
        }
        
    }
    function isLandlord(user) {
        if (user && user.isLandlord === 0) {
            return false;
        } else if (user && user.isLandlord === 1) {
            return true;
        }
        else {
            return false;
        }
        
    }


   

    if (subpage === undefined) {
        subpage = 'profile';
    }
    
    function linkClasses(type = null) {
        let classes = 'btn';
        if (type === subpage) {
            classes += ' bg-black text-white';
        }
        return classes;
    }
    return (
        <nav className="d-flex justify-content-center mt-3 gap-3 mb-4">
        <Link to={"/account"}>
            <Button variant={linkClasses("profile")}>
                <img className="icon-sm" src={userProfile} alt="icon description" stroke='currentColor'/>
                Mon profil
            </Button>
        </Link>

        <Link to={"/account/bookings"}><Button variant={linkClasses("bookings")}>
            <svg className="icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Mes réservations
        </Button></Link>
        {user && isLandlord(user) && (    
            
                <Link to={"/account/places"}>
                    <Button variant={linkClasses("places")}>
                    <svg className="icon-sm"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Mes biens
                    </Button>
                </Link>)}
            
        {user && isAdmin(user) && (

                <Link to={"/account/admin"}>
                    <Button variant={linkClasses("admin")}>
                        <svg className="icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                        Admin
                    </Button>
                </Link>

            )}
    </nav>
    )
}