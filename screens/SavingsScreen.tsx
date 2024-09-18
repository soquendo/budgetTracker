import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

type SavingEntry = {
  id: string;
  goal: string;
  amount: number;
};

export default function SavingsScreen() {
  const [savingEntries, setSavingEntries] = useState<SavingEntry[]>([]);
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');

  const addSaving = () => {
    if (!goal || !amount) {
      Alert.alert('Error', 'Please enter both a goal and an amount.');
      return;
    }
    const newEntry: SavingEntry = {
      id: Date.now().toString(),
      goal,
      amount: parseFloat(amount),
    };
    setSavingEntries([...savingEntries, newEntry]);
    setGoal('');
    setAmount('');
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Saving Goal"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Add Saving" onPress={addSaving} />
      <FlatList
        data={savingEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.listItem}>
            <Text>{item.goal}: ${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}