// See shared code above
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MoodList() {
  const { state } = useAppContext();

  if (state.loading) {
    return <Text style={{ textAlign: 'center', marginTop: 32 }}>Loading...</Text>;
  }

  if (!state.moods.length) {
    return <Text style={{ textAlign: 'center', marginTop: 32 }}>No moods recorded yet.</Text>;
  }

  return (
    <FlatList
      data={state.moods}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{
          backgroundColor: item.color || '#fff',
          borderRadius: 14,
          margin: 8,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2
        }}>
          <Text style={{ fontSize: 28 }}>{item.moodLabel}</Text>
          <Text style={{ fontWeight: 'bold', marginVertical: 2 }}>{formatDate(item.date)}</Text>
          {item.note ? <Text style={{ marginTop: 6 }}>{item.note}</Text> : null}
        </View>
      )}
    />
  );
}
