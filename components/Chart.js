import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useAppContext } from '../contexts/AppContext';

const screenWidth = Dimensions.get('window').width;

export default function Chart() {
  const { state } = useAppContext();

  // Son 7 gün ve o güne ait mood sayısı
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  };
  const last7Days = getLast7Days();
  const dailyCounts = last7Days.map(date =>
    state.moods.filter(item => item.date.startsWith(date)).length
  );

  // Pie chart için mood dağılımı
  const moodColors = {
    happy: '#FFD700',
    sad: '#87CEEB',
    angry: '#FF6347',
    relaxed: '#90EE90',
    neutral: '#B0B0B0',
  };
  const moodCounts = {};
  state.moods.forEach(item => {
    moodCounts[item.moodLabel] = (moodCounts[item.moodLabel] || 0) + 1;
  });
  const pieData = Object.entries(moodCounts).map(([label, value]) => ({
    name: label,
    population: value,
    color: moodColors[label?.toLowerCase()] || '#ccc',
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>
        Mood Trend (Last 7 Days)
      </Text>
      <BarChart
        data={{
          labels: last7Days.map(d => d.slice(5)), // 'MM-DD'
          datasets: [{ data: dailyCounts }],
        }}
        width={screenWidth - 32}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => '#333',
        }}
        style={{ marginVertical: 8, borderRadius: 8 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 24, marginBottom: 10 }}>
        Mood Distribution
      </Text>
      <PieChart
        data={pieData}
        width={screenWidth - 32}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
    </View>
  );
}
