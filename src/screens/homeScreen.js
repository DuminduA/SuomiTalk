import React,  { useState, useRef, useEffect } from 'react';
import { 
  View, Text, Button, 
  TextInput, Image, TouchableOpacity, 
  Animated, Easing, Switch } from 'react-native';
import homeScreenStyles from '../styles/homeStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {API_KEY} from '@env'
import axios from 'axios';
import Voice from '@react-native-voice/voice'
import { User } from 'firebase/auth';


const HomeScreen = ({ user, handleAuthentication }) => {
  let [englishText, setEngText] = useState('');
  let [finnishText, setFinText] = useState('');
  let [micPressed, setMicPressed] = useState(false);
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const toggleSwitch = () => setIsTranslationEnabled(previousState => !previousState);

  const url = "https://api.openai.com/v1/chat/completions?model=gpt-4"

  const animatedValue = useRef(new Animated.Value(1)).current;

  const onPressMicrophone = (press) => {
    clearInputs()
    console.log("press " + press)
    console.log("micPressed" + micPressed)
    if (press) {
      setMicPressed(true)
      startSpeechToText()
    } else {
      setMicPressed(false)
      stopSpeechToText()
    }
  };

  const clearInputs = () => {
    setFinText('')
    setEngText('')
  }

  useEffect(() => {
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
  
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    }, []);
  
    const startSpeechToText = async () => {
      console.log("Start Speech Recognition")
      await Voice.start("en-NZ");
      setStarted(true);
    };
  
    const stopSpeechToText = async () => {
      console.log("Stop Speech Recognition")
      await Voice.stop();
      setStarted(false);
    };
  
    const onSpeechResults = (result) => {
      console.log("Speech Recognition Results received")
      console.log(result.value)
      setEngText(result.value)
    };
  
    const onSpeechError = (error) => {
      console.log(error);
    };

    const generalResponse = async () => {
      try {
        const response = await axios.post(
          url,
          {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "You will be provided with a question in English about Finnish language, and your task is to answer it as concise as possible ."
              },
              {
                "role": "user",
                "content": englishText
              }
            ],
            "temperature": 0.7,
            "max_tokens": 64,
            "top_p": 1
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
            params: {
              model: 'gpt-3.5-turbo',
            },
          }
        );
        console.log("general response")
        console.log(response.data.choices[0].message.content)
        setFinText(response.data.choices[0].message.content)
      } catch (error) {
        console.log("API Call Failed")
        setError(error);
      }
    }

    const translate = async () => {
      // Call Open APIs and get the results and display it
      console.log(englishText)
      console.log(API_KEY)

      try {
        const response = await axios.post(
          url,
          {
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "You will be provided with a sentence in English, and your task is to translate it into Finnish."
              },
              {
                "role": "user",
                "content": englishText
              }
            ],
            "temperature": 0.7,
            "max_tokens": 64,
            "top_p": 1
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
            params: {
              model: 'gpt-3.5-turbo',
            },
          }
        );
        console.log(response.data.choices[0].message.content)
        setFinText(response.data.choices[0].message.content)
      } catch (error) {
        console.log("API Call Failed")
        setError(error);
      }
    }

    const handleTextChange = (inputText) => {
      setEngText(inputText)
    };

    return (
      <View style={homeScreenStyles.container}>
        {/* View for the menu icon and profile photo */}
        <View style={homeScreenStyles.headerContainer}>
        <Icon name="menu" size={50} color="#900" />
        <Image
          style={homeScreenStyles.tinyLogo}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }} 
        />
        </View>

        {/* Body of the Home page */}
        <View style= {homeScreenStyles.bodyContainer}>
          <View style={homeScreenStyles.translationToggle}>
          <Text> Translation </Text>
          <Switch
                trackColor={{false: '#767577', true: '#900'}}
                thumbColor={isTranslationEnabled ? '#00000' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isTranslationEnabled}
              />
          </View>


          {/* English text display */}
          <Text 
          style={homeScreenStyles.langText}>English
          </Text>

          {micPressed ? 
            <Text
            style={homeScreenStyles.textbox} 
            >{englishText}</Text>
          :
            <TextInput
            multiline
            style={homeScreenStyles.textbox}
            value={englishText} 
            onChangeText={handleTextChange}
            placeholder='Please type your english text here to translate..'
            />
        }


          {/*  Swap Icon and submit button */}
          <View style={homeScreenStyles.swapIconHolder}>
            <Button
            title={isTranslationEnabled ? 'Translate': "Submit"}
            onPress={isTranslationEnabled? translate: generalResponse}
            />
            <TouchableOpacity>
              <Icon name="swap-vertical" size={50} color="#900" />
            </TouchableOpacity>
          
          </View>

          {/* Finnish text display */}
          <Text 
          style={homeScreenStyles.langText}>Finnish</Text>
          <Text
          style={homeScreenStyles.textbox} 
          >{finnishText}</Text>
        </View>

        {/* When Mic pressed other buttons in the tray should disappear */}
        {micPressed ? 
        <View style={homeScreenStyles.iconTrayMicPressed}>
          <TouchableOpacity
            onPress={() => onPressMicrophone(false)}>
            <IconAwesome name="microphone" size={50} color="#900" />
          </TouchableOpacity>
        </View>
         :
        <View style={homeScreenStyles.iconTray}>
        <TouchableOpacity>
          <Icon name="language" size={50} color="#900" />
        </TouchableOpacity> 
        <TouchableOpacity
          onPress={() => onPressMicrophone(true)}>
          <IconAwesome name="microphone" size={50} color="#900" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconAwesome name="camera" size={50} color="#900" />
        </TouchableOpacity>
        </View> 
      }

      </View>
      
    );
};

export default HomeScreen;
