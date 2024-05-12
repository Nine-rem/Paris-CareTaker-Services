import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
            axios.get('/profile', { withCredentials: true })
            .then((response) => {
                const data = response.data;
                if (data) {
                    const userDetails = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                    };
                    setUser(userDetails);  
                } else {
                    setUser(null);  
                }
                setReady(true);  
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération du profil :", error);
                setReady(true); 
            });
    }, []);

    const logout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            setUser(null); 
            setReady(false); 
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, ready, logout }}>
            {children}
        </UserContext.Provider>
    );
}
