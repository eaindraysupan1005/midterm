import axios from 'axios';

const API_KEY = 'AIzaSyAkeVRfRpUOEt0kWnLTSyL6cjDudyU1lw4';

export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
      }
    );

    // Ensure the response structure is correct
    if (response && response.data && response.data.data && response.data.data.translations) {
      return response.data.data.translations[0].translatedText;
    } else {
      throw new Error('Unexpected response structure from the translation API');
    }
  } catch (error) {
    console.error('Error during translation', error);
    // Optionally return a fallback error message
    return 'Translation failed';
  }
};
