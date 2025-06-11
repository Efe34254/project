// See shared code above
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Tüm mood kayıtlarını AsyncStorage ile sakla
export async function saveMoodsToStorage(moods) {
  try {
    await AsyncStorage.setItem('moods', JSON.stringify(moods));
    return true;
  } catch (e) {
    return false;
  }
}

// Mood kayıtlarını AsyncStorage'dan yükle
export async function loadMoodsFromStorage() {
  try {
    const moods = await AsyncStorage.getItem('moods');
    return moods ? JSON.parse(moods) : [];
  } catch (e) {
    return [];
  }
}

// Hassas veriler için SecureStore (örn. şifre, gizli ayar vs.)
export async function saveSecureData(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getSecureData(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (e) {
    return null;
  }
}
