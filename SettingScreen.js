import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen({ navigation }) {
  const [preferredLang, setPreferredLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('medium');

  const handleSave = () => {
    alert(`Settings Saved\nLanguage: ${preferredLang}\nTheme: ${darkMode ? 'Dark' : 'Light'}\nText Size: ${textSize}`);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkMode]}>
      <Text style={[styles.header, darkMode && styles.headerDark]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.label, darkMode && styles.labelDark]}>Preferred Language:</Text>
        <View style={styles.pickerContainer}>
        <Picker selectedValue={preferredLang} onValueChange={setPreferredLang} style={styles.picker}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, darkMode && styles.labelDark]}>Text Size:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={textSize} onValueChange={setTextSize} style={styles.picker}>
            <Picker.Item label="Small" value="small" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Large" value="large" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={[styles.saveButton, darkMode && styles.saveButtonDark]} onPress={handleSave}>
        <Text style={[styles.saveButtonText, darkMode && styles.saveButtonTextDark]}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#f8e9f8',
  },
  darkMode: {
    backgroundColor: '#333',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerDark: {
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelDark: {
    color: '#fff',
  },
 
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchLabelDark: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#ad6f34',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDark: {
    backgroundColor: '#444',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  saveButtonTextDark: {
    color: '#f2a7d7',
  },
});
