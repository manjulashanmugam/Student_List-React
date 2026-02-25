import React, { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourite = (student) => {
    const exists = favourites.find((item) => item.id === student.id);
    if (!exists) {
      setFavourites([...favourites, student]);
    }
  };

  const removeFromFavourite = (id) => {
    setFavourites(favourites.filter((student) => student.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{ favourites, addToFavourite, removeFromFavourite }}
    >
      {children}
    </StudentContext.Provider>
  );
};