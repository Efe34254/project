import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, setState] = useState({
    moods: [],
    theme: 'light',
  });

  // Yeni mood ekle
  const addMood = (mood) => {
    setState(prev => ({
      ...prev,
      moods: [...prev.moods, { ...mood, id: Date.now().toString() }]
    }));
  };

  // Mood sil
  const deleteMood = (id) => {
    setState(prev => ({
      ...prev,
      moods: prev.moods.filter(m => m.id !== id)
    }));
  };

  // Tema değiştir
  const setTheme = (theme) => setState(prev => ({ ...prev, theme }));

  return (
    <AppContext.Provider value={{
      state, addMood, deleteMood, setTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
