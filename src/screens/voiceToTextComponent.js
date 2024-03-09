import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceToTextComponent = () => {

    let [started, setStarted] = useState(false);
    let [results, setResults] = useState([]);
  
    useEffect(() => {
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
    
        return () => {
          Voice.destroy().then(Voice.removeAllListeners);
        }
      }, []);
    
      const startSpeechToText = async () => {
        await Voice.start("en-NZ");
        setStarted(true);
      };
    
      const stopSpeechToText = async () => {
        await Voice.stop();
        setStarted(false);
      };
    
      const onSpeechResults = (result) => {
        setResults(result.value);
      };
    
      const onSpeechError = (error) => {
        console.log(error);
      };


    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default VoiceToTextComponent;
