import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const moods = [
  { mood: 'happy', emoji: '😊', color: '#FFD700', label: 'Happy' },
  { mood: 'sad', emoji: '😢', color: '#87CEEB', label: 'Sad' },
  { mood: 'angry', emoji: '😡', color: '#FF6347', label: 'Angry' },
  { mood: 'relaxed', emoji: '😌', color: '#90EE90', label: 'Relaxed' },
  { mood: 'neutral', emoji: '😐', color: '#B0B0B0', label: 'Neutral' },
];

export default function AddMoodScreen() {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const { addMood } = useAppContext();

  const save = () => {
    if (selected) {
      addMood({
        ...selected,
        note,
        date: new Date().toISOString(),
        moodLabel: selected.label,
      });
      setSelected(null);
      setNote('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>How do you feel today?</Text>
      <Text style={{ marginBottom: 8 }}>Select your mood:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m.mood}
            onPress={() => setSelected(m)}
            style={{
              backgroundColor: selected?.mood === m.mood ? m.color : '#eee',
              borderRadius: 12,
              padding: 10,
              marginRight: 10,
              borderWidth: selected?.mood === m.mood ? 2 : 1,
              borderColor: selected?.mood === m.mood ? '#222' : '#aaa',
            }}
          >
            <Text style={{ fontSize: 28 }}>{m.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Add a note (optional)"
        style={{
          borderWidth: 1, borderColor: '#aaa', borderRadius: 8, marginBottom: 12, padding: 10,
        }}
      />
      <Button title="SAVE MOOD" onPress={save} />
    </View>
  );
}
