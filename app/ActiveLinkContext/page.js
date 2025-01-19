import React, { createContext, useState } from 'react';

export const ActiveLinkContext = createContext();

export const ActiveLinkProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState('');

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};