import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';

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
    const newEntry: SavingEntry = {
      id: Date.now().toString(),
      goal: goal,
      amount: parseFloat(amount),
    };
    setSavingEntries([...savingEntries, newEntry]);
    setGoal('');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Saving Goal"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <Button title="Add Saving" onPress={addSaving} />
      <FlatList
        data={savingEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.goal}: ${item.amount.toFixed(2)}</Text>
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