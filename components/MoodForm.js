import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const moodOptions = [
  { label: '😊', value: 'happy', color: '#FFD700' },
  { label: '😢', value: 'sad', color: '#87CEEB' },
  { label: '😡', value: 'angry', color: '#FF6347' },
  { label: '😌', value: 'relaxed', color: '#90EE90' },
  { label: '😐', value: 'neutral', color: '#B0B0B0' },
];

export default function MoodForm() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useAppContext();

  const handleAdd = () => {
    if (!selectedMood) {
      setError('Please select your mood.');
      return;
    }
    setError('');
    const newMood = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood.value,
      moodLabel: selectedMood.label,
      color: selectedMood.color,
      note: note.trim(),
    };
    dispatch({ type: 'ADD_MOOD', payload: newMood });
    setSelectedMood(null);
    setNote('');
  };

  return (
    <View>
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Select your mood:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {moodOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={{
              backgroundColor: selectedMood?.value === option.value ? option.color : '#f0f0f0',
              borderRadius: 20,
              padding: 14,
              marginRight: 10,
              borderWidth: selectedMood?.value === option.value ? 2 : 1,
              borderColor: selectedMood?.value === option.value ? '#333' : '#ccc',
            }}
            onPress={() => setSelectedMood(option)}
          >
            <Text style={{ fontSize: 24 }}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
        style={{
          marginBottom: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          padding: 8,
        }}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 6 }}>{error}</Text> : null}
      <Button title="Save Mood" onPress={handleAdd} />
    </View>
  );
}
// See shared code above
