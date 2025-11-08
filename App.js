import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  const [mode, setMode] = useState('classic');
  const [sides, setSides] = useState(6);
  const [customValues, setCustomValues] = useState(Array(6).fill(''));
  const [result, setResult] = useState(null);

  const handleSidesChange = (value) => {
    const n = parseInt(value, 10) || 0;
    // Clamp sides between 2 and 10
    const s = Math.max(2, Math.min(10, n));
    setSides(s);
    if (customValues.length !== s) {
      setCustomValues(Array(s).fill(''));
    }
  };

  const handleCustomChange = (value, index) => {
    const newValues = [...customValues];
    newValues[index] = value;
    setCustomValues(newValues);
  };

  const roll = () => {
    if (mode === 'classic') {
      const res = Math.floor(Math.random() * sides) + 1;
      setResult(`You rolled: ${res}`);
    } else {
      const randomIndex = Math.floor(Math.random() * sides);
      const val = customValues[randomIndex] || `Face ${randomIndex + 1}`;
      setResult(val);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Party Dice App</Text>
      <View style={styles.modeButtons}>
        <Button title="Classic" onPress={() => setMode('classic')} />
        <Button title="Custom" onPress={() => setMode('custom')} />
      </View>
      <View style={styles.inputRow}>
        <Text>Number of sides (2-10): </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          value={String(sides)}
          onChangeText={handleSidesChange}
        />
      </View>
      {mode === 'custom' && (
        <View style={styles.customList}>
          {customValues.map((val, i) => (
            <TextInput
              key={i}
              style={styles.textInput}
              placeholder={`Value for side ${i + 1}`}
              value={val}
              onChangeText={(text) => handleCustomChange(text, i)}
            />
          ))}
        </View>
      )}
      <Button title="Roll" onPress={roll} />
      {result && <Text style={styles.result}>{result}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 5,
    flex: 1,
  },
  customList: {
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
