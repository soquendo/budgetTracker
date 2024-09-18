import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';

type IncomeEntry = {
  id: string;
  source: string;
  amount: number;
};

export default function IncomeScreen() {
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const addIncome = () => {
    const newEntry: IncomeEntry = {
      id: Date.now().toString(),
      source: source,
      amount: parseFloat(amount),
    };
    setIncomeEntries([...incomeEntries, newEntry]);
    setSource('');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Income Source"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <Button title="Add Income" onPress={addIncome} />
      <FlatList
        data={incomeEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.source}: ${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
  },
});