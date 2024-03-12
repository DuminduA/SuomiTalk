import 'react-native-gesture-handler';
import React,  { useState, useRef, useEffect } from 'react';
import { 
  View, Text, Button, 
  TextInput, Image, TouchableOpacity, 
  Animated, Easing } from 'react-native';
import homeScreenStyles from '../styles/homeStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ user, handleAuthentication }) => {
  let [englishText, setEngText] = useState('');
  let [finnishText, setFinText] = useState('');
  let [micPressed, setMicPressed] = useState(false);
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);
  const animatedValue = useRef(new Animated.Value(1)).current;

  const swapScreens = () => {
    

  }

  const pressMicrophone = () => {

  }

  const pressCamera = () => {

  }

  const pressLanguageText = () => {

  }

  const startListening = async () => {

  };

  const onPressMicrophone = () => {
    if (micPressed) {
      setMicPressed(false)
      stopSpeechToText()
    } else {
      setMicPressed(true)
      startSpeechToText()
    }
    console.log("Mic Pressed", micPressed)
    if (micPressed) {
      // Animate the microphone button
      Animated.timing(animatedValue, {
        toValue: 1.5,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(startListening);
    }
  };

  // const resetMicrophoneAnimation = () => {
  //   // Reset the animation when microphone button is released
  //   Animated.timing(animatedValue, {
  //     toValue: 1,
  //     duration: 300,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const scaleAnimation = {
    transform: [{ scale: animatedValue }],
  };

  useEffect(() => {
      // Voice.onSpeechError = onSpeechError;
      // Voice.onSpeechResults = onSpeechResults;
  
      // return () => {
      //   Voice.destroy().then(Voice.removeAllListeners);
      // }
    }, []);
  
    const startSpeechToText = async () => {
      // await Voice.start("en-NZ");
      setStarted(true);
    };
  
    const stopSpeechToText = async () => {
      // await Voice.stop();
      setStarted(false);
    };
  
    const onSpeechResults = (result) => {
      setResults(result.value);
    };
  
    const onSpeechError = (error) => {
      console.log(error);
    };

    const translate = () => {
      // Call Open APIs and get the results and display it
      console.log(englishText)

      setFinText("I am the open API tranlation")
    }
  

  
  const handleTextChange = (inputText) => {
    setEngText(inputText)
  };

    return (
      <View style={homeScreenStyles.container}>
        <View style={homeScreenStyles.headerContainer}>
        <Icon name="menu" size={50} color="#900" />
        <Image
          style={homeScreenStyles.tinyLogo}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }} 
        />
        </View>
        <View style= {homeScreenStyles.bodyContainer}>
          {micPressed ? results.map((result, index) => <Text style={homeScreenStyles.langText} key={index}>{result}</Text>) : 
          <Text style={homeScreenStyles.langText}>English</Text>}
          <TextInput
          multiline
          style={homeScreenStyles.textbox}
          value={englishText} 
          onChangeText={handleTextChange}
          placeholder='Please type your english text here to translate..'
          />
          <View style={homeScreenStyles.swapIconHolder}>
          <Button
          title='Translate'
          onPress={translate}
          />
          <TouchableOpacity>
            <Icon name="swap-vertical" size={50} color="#900" />
            </TouchableOpacity>
          </View>
          <Text 
          style={homeScreenStyles.langText}>Finnish</Text>
          <TextInput 
          value={finnishText}
          style={homeScreenStyles.textbox} 
          />
        </View>
        {micPressed ? 
        <View style={homeScreenStyles.iconTrayMicPressed}>
          <TouchableOpacity
            onPress={onPressMicrophone}>
            <IconAwesome name="microphone" size={50} color="#900" />
          </TouchableOpacity>
        </View>
         :
        <View style={homeScreenStyles.iconTray}>
        <TouchableOpacity>
          <Icon name="language" size={50} color="#900" />
        </TouchableOpacity> 
        <TouchableOpacity
          onPress={onPressMicrophone}>
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
