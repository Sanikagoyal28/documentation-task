import React, { createContext, useState } from 'react';
export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);
  const [editDocId, setEditDocId] = useState(null);
  return (
    <AdminContext.Provider value={{ adminId, setAdminId, editDocId, setEditDocId }}>
      {children}
    </AdminContext.Provider>
  );
};
