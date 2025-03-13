import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translateText } from '../TranslateService'; // Import your translation function

export default function TranslateScreen({ route, navigation }) {
  const { text, sourceLang, targetLang } = route.params || {};
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        // Translate the text
        const translation = await translateText(text, sourceLang, targetLang);
        setTranslatedText(translation);

        // Load the history from AsyncStorage
        const storedHistory = JSON.parse(await AsyncStorage.getItem('history')) || [];
        setHistory(storedHistory);
      } catch (error) {
        setTranslatedText('Error in translation');
        console.error("Error during translation", error);
      }
    };

    fetchTranslation();
  }, [text, sourceLang, targetLang]);  // Ensure this re-runs when the params change

  return (
    <View style={styles.container}>
      <Text style={styles.historyTitle}>Currently Translated</Text>
      {/* Card for Original Text */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Original: {text}</Text>
        <Text style={styles.cardText}>Translated: {translatedText}</Text>
      </View>

      <TouchableOpacity
  style={styles.button}
  onPress={async () => {
    // Get the actual translation
    const translatedText = await translateText(text, sourceLang, targetLang);

    // Save it to history
    await saveHistory(text, translatedText); 

    // Navigate to History screen with the required params
    navigation.navigate('History', { 
      text, 
      translatedText,  // Pass the translated text here
      sourceLang, 
      targetLang 
    });
  }}
>
  <Text style={styles.buttonText}>Go to History</Text>
</TouchableOpacity>




    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 50, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#f8e9f8' },
  historyTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: '#ad6f34',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { textAlign: 'center', color: 'white', fontSize: 18 },

  cardText: { color: '#fff', fontSize: 18 },
  button: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#ad6f34',
    borderRadius: 15
  },
});
