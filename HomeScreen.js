import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from '@react-native-picker/picker';

// List of 20 languages with their codes
const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Russian', value: 'ru' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Punjabi', value: 'pa' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Greek', value: 'el' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Polish', value: 'pl' }
];

export default function HomeScreen({ navigation }) {
    const [text, setText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');

    useEffect(() => {
        const clearStorage = async () => {
          try {
            await AsyncStorage.clear();
            console.log("AsyncStorage cleared!");
          } catch (error) {
            console.error("Error clearing AsyncStorage", error);
          }
        };
      
        clearStorage(); // Call to clear AsyncStorage
      }, []);

    const saveHistory = async (originalText, translatedText) => {
        try {
            // Retrieve the current history, or initialize it as an empty array if it doesn't exist
            const storedHistory = JSON.parse(await AsyncStorage.getItem('history')) || [];
            const newHistory = [{ text: originalText, translatedText }, ...storedHistory];
            
            // Save the updated history back to AsyncStorage
            await AsyncStorage.setItem('history', JSON.stringify(newHistory));
        } catch (error) {
            console.error("Error saving translation history", error);
        }
    };
    
    const translateText = async (text, sourceLang, targetLang) => {
        // This is a mock translation. Replace it with an actual API call.
        return `${text} (translated to ${targetLang})`;
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Language Translator App</Text>
            <Text style={styles.label}>Enter text:</Text>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Type here..."
            />

            <Text style={styles.label}>From:</Text>
            <View style={styles.pickerContainer}>
            <Picker selectedValue={sourceLang} onValueChange={setSourceLang} style={styles.picker}>
                {languageOptions.map((lang, index) => (
                    <Picker.Item key={index} label={lang.label} value={lang.value} />
                ))}
            </Picker>
            </View>
                        
            <Text style={styles.label}>To:</Text>
            <View style={styles.pickerContainer}>
            <Picker selectedValue={targetLang} onValueChange={setTargetLang} style={styles.picker}>
                {languageOptions.map((lang, index) => (
                    <Picker.Item key={index} label={lang.label} value={lang.value} />
                ))}
            </Picker>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    const translatedText = await translateText(text, sourceLang, targetLang); // Get the actual translation
                    await saveHistory(text, translatedText); // Save it to history
                    navigation.navigate('Translate', { text, sourceLang, targetLang });
                }}
            >
                <Text style={styles.buttonText}>Translate</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.cardText}>Name: Eaindray Su Pan</Text>
                <Text style={styles.cardText}>ID: 6631503057</Text>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f8e9f8' },
    title: {fontSize: 22, textAlign: 'center',fontWeight: 'bold'},
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 10,  },
    input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 5 ,  height: 60,},
    button: {
        width: '40%',
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#ad6f34',
        borderRadius: 15
    },
    buttonText: { textAlign: 'center', color: 'white', fontSize: 18 },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
      },
    card: {
        marginTop: 150,
        padding: 15,
        backgroundColor: '#f5deb3', 
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        width: '80%'
    },
    cardText: { fontSize: 16, color: '#333', fontWeight: 'bold' }
});
