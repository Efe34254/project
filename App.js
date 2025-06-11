import React from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { AppProvider, useAppContext } from './contexts/AppContext';
import AppNavigator from './navigation/AppNavigator';

function Main() {
  const { state } = useAppContext();
  const theme = state.theme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
