import React, { createContext, useState } from "react";

// Create the context
export const FavoritesContext = createContext();

// Context provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add an item to favorites
  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  // Remove an item from favorites
  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.uid !== itemId)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};