import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '../contexts/AppContext';

export default function HomeScreen() {
  const { state, deleteMood } = useAppContext();

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Mood History</Text>
      {state.moods.slice().reverse().map((item) => (
        <View key={item.id} style={{
          backgroundColor: item.color,
          marginBottom: 14,
          borderRadius: 16,
          padding: 16,
          elevation: 3,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 3 }}>
              {new Date(item.date).toLocaleString()}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 2 }}>{item.note}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteMood(item.id)}>
            <MaterialIcons name="delete" size={28} color="#ff3333" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
