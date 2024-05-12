import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
          axios.get('/profile').then((response) => {
            const data = response.data;

            const userDetails = {
              firstName: data.firstName,
              lastName: data.lastName,
            };
            setUser(userDetails);
          }).catch((error) => {
            console.error("Erreur lors de la récupération du profil :", error);
          });
        }
      }, []);

    return (
        <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
    );
}
