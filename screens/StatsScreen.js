import React from 'react';
import { View, Text } from 'react-native';
import Chart from '../components/Chart';

export default function StatsScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Mood Analytics</Text>
      <Chart />
    </View>
  );
}
