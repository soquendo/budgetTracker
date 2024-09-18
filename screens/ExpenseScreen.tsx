import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles'; // Adjust the path as needed

type ExpenseEntry = {
  id: string;
  category: string;
  amount: number;
  description: string;
};

export default function ExpenseScreen() {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const addExpense = () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Please enter both a category and an amount.');
      return;
    }
    const newExpense: ExpenseEntry = {
      id: Date.now().toString(),
      category,
      amount: parseFloat(amount),
      description,
    };
    setExpenses([...expenses, newExpense]);
    setCategory('');
    setAmount('');
    setDescription('');
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Expense" onPress={addExpense} />

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.listItem}>
            <Text>{item.category}: ${item.amount.toFixed(2)}</Text>
            <Text>{item.description}</Text>
            <Button title="Delete" onPress={() => deleteExpense(item.id)} color="#ff6347" />
          </View>
        )}
      />
    </View>
  );
}