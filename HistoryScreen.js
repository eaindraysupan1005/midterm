import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translateText } from '../TranslateService'; // Import your translation function

export default function HistoryScreen({ route }) {
  const { text, translatedText, sourceLang, targetLang } = route.params || {}; // Ensure all params are received
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Load the history from AsyncStorage
        const storedHistory = JSON.parse(await AsyncStorage.getItem('history')) || [];
        setHistory(storedHistory);
      } catch (error) {
        console.error("Error loading history", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.historyTitle}>Currently Translated</Text>
      
      {/* Card for Original and Translated Text */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Original: {text}</Text>
        <Text style={styles.cardText}>Translated: {translatedText}</Text>
      </View>

      <Text style={styles.historyTitle}>Translation History</Text>
      
      {/* Display history */}
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyItemText}>Original: {item.text}</Text>
            <Text style={styles.historyItemText}>Translated: {item.translatedText}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#f8e9f8' },
  historyTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: '#ad6f34',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '80%',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: { color: '#fff', fontSize: 18 },
  historyItem: {
    backgroundColor: '#f5deb3',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  historyItemText: { fontSize: 16, color: '#000' },
});
