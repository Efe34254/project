import React from 'react';
import { View, Text, Button, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// CSV Yardımcı Fonksiyonu
function moodsToCSV(moods) {
  if (!moods.length) return '';
  const header = 'Date,Mood,Note\n';
  const rows = moods.map(
    m => `${m.date},${m.moodLabel},${m.note ? '"' + m.note.replace(/"/g, '""') + '"' : ''}`
  );
  return header + rows.join('\n');
}

import { useAppContext } from '../contexts/AppContext';

export default function SettingsScreen() {
  const { state } = useAppContext();

  // JSON indir
  const exportJSON = async () => {
    try {
      const fileName = 'moods.json';
      const jsonString = JSON.stringify(state.moods, null, 2);
      let fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      if (Platform.OS === 'android') {
        // Android: Storage Access Framework ile kaydet
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const destUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            'application/json'
          );
          await FileSystem.writeAsStringAsync(destUri, jsonString);
          Alert.alert('Success', 'JSON file downloaded!');
        } else {
          await Sharing.shareAsync(fileUri, { mimeType: 'application/json' });
        }
      } else {
        // iOS: Paylaşım menüsü ile
        await Sharing.shareAsync(fileUri, { mimeType: 'application/json' });
      }
    } catch (e) {
      Alert.alert('Extraction has failed', e.message);
    }
  };

  // CSV indir
  const exportCSV = async () => {
    try {
      const fileName = 'moods.csv';
      const csv = moodsToCSV(state.moods);
      let fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, csv);

      if (Platform.OS === 'android') {
        // Android: Storage Access Framework ile kaydet
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const destUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            'text/csv'
          );
          await FileSystem.writeAsStringAsync(destUri, csv);
          Alert.alert('Success', 'CSV file downloaded!');
        } else {
          await Sharing.shareAsync(fileUri, { mimeType: 'text/csv' });
        }
      } else {
        // iOS: Paylaşım menüsü ile
        await Sharing.shareAsync(fileUri, { mimeType: 'text/csv' });
      }
    } catch (e) {
      Alert.alert('Extraction has failed', e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Settings</Text>
      <Button title="Download Data as JSON" onPress={exportJSON} />
      <View style={{ height: 12 }} />
      <Button title="Download Data as CSV" onPress={exportCSV} />
      <Text style={{ color: '#888', fontSize: 13, marginTop: 30 }}>
        Tüm mood verileriniz cihazınızda güvenli şekilde saklanır ve istediğiniz zaman indirilebilir.
      </Text>
    </View>
  );
}
