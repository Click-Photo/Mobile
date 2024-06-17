import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        console.log("Login Data:", userData);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
        }));
      };

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
