import React, { useContext } from 'react';
import { UserContext } from '../userContext.jsx';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PlacesPage from './placesPage.jsx';
import '../placesPage.css';  
import AccountNav from '../accountNav.jsx';


/* lien des icones https://heroicons.com/ */
export default function ProfilePage() {
    const { ready, user, logout } = useContext(UserContext);
    let { subpage } = useParams();
    const navigate = useNavigate();

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

    if (ready && !user) {
        return <Navigate to="/login" />;
    }



    return (
        <>
            <div>
                <AccountNav />
                {subpage === 'profile' && (
                    <div className='text-center max-w-lg mx-auto'>
                        Bonjour {user.firstName} {user.lastName} !<br />
                        <button onClick={handleLogout} type="button" className="btn btn-dark max-w-sm mt-2">Se déconnecter</button>
                    </div>
                )}
                
            </div>
        </>
    );
}
