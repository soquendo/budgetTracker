import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

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
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Income Source"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={globalStyles.input}
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
          <View style={globalStyles.listItem}>
            <Text>{item.source}: ${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}