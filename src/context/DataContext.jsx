import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCompanies, mockInternships, mockStudents, mockApplications, mockUsers, mockMessages } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const DATA_VERSION = 'v6-realistic-data';

const getInitialData = () => ({
  companies: mockCompanies,
  internships: mockInternships,
  students: mockStudents,
  applications: mockApplications,
  users: mockUsers,
  messages: mockMessages
});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem('internshipData');
    const localVersion = localStorage.getItem('dataVersion');
    
    if (localData && localVersion === DATA_VERSION) {
      return JSON.parse(localData);
    }
    
    // Seed new data
    const initialData = getInitialData();
    localStorage.setItem('internshipData', JSON.stringify(initialData));
    localStorage.setItem('dataVersion', DATA_VERSION);
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('internshipData', JSON.stringify(data));
  }, [data]);

  const addApplication = (application) => {
    setData(prev => ({
      ...prev,
      applications: [...prev.applications, application]
    }));
  };

  const updateApplicationStatus = (appId, status) => {
    setData(prev => ({
      ...prev,
      applications: prev.applications.map(app => 
        app.id === appId ? { ...app, status } : app
      )
    }));
  };

  const addInternship = (internship) => {
    setData(prev => ({
      ...prev,
      internships: [...prev.internships, internship]
    }));
  };

  const addMessage = (message) => {
    setData(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const markMessagesAsRead = (senderId, receiverId) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(m => 
        (m.senderId === senderId && m.receiverId === receiverId) ? { ...m, read: true } : m
      )
    }));
  };

  const resetData = () => {
    const initialData = getInitialData();
    setData(initialData);
    localStorage.setItem('internshipData', JSON.stringify(initialData));
    localStorage.setItem('dataVersion', DATA_VERSION);
  };

  return (
    <DataContext.Provider value={{ data, addApplication, updateApplicationStatus, addInternship, addMessage, markMessagesAsRead, resetData }}>
      {children}
    </DataContext.Provider>
  );
};
