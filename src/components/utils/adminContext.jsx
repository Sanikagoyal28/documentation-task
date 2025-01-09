import React, { createContext, useEffect, useState } from 'react';
export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    setAdminId(localStorage.getItem('adminId'));
  }, []);
  return <AdminContext.Provider value={{ adminId, setAdminId }}>{children}</AdminContext.Provider>;
};
