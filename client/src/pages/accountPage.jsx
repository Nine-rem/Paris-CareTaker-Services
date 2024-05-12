import React, {useContext} from 'react';
import { UserContext } from '../userContext';
import { Link, Navigate, redirect, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function AccountPage() {
    const {ready,user, logout} = useContext(UserContext);
    let {subpage} = useParams();
    const navigate  = useNavigate();
    if (!subpage) {
        subpage = 'profile';
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login'); 
    };

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (ready && !user && !redirect) {
        return <Navigate to="/login" />;
    }

    
    
    function linkClasses(type=null){
        let classes = 'btn';
        if (type === subpage) {
            classes += ' bg-black text-white';
        }
        return classes;

    }
    return (
        <>
        <div>
            <nav className="d-flex justify-content-center mt-3 gap-3 mb-4">
                <Link to={"/account"}><Button variant={linkClasses("profile")}>My profile </Button></Link>
                <Link to={"/account/bookings"}><Button variant={linkClasses("bookings")}>My bookings</Button></Link>
                <Link to={"/account/places"}><Button variant={linkClasses("places")}>My accommodations</Button></Link>

            </nav>
            {subpage === 'profile' && (
                    <div className='text-center max-w-lg mx-auto'>
                        Logged in as {user.firstName} {user.lastName} <br />

                        <button onClick={handleLogout} type="button" className="btn btn-dark max-w-sm mt-2">Logout</button>
                        </div>

            )}

                        



        </div>
        </>
    );
}
