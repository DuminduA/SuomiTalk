import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import loginStyles from '../styles/loginStyles';

const LoginScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={loginStyles.authContainer}>
       <Text style={loginStyles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

       <TextInput
        style={loginStyles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={loginStyles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={loginStyles.bottomContainer}>
        <Text style={loginStyles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}

export default LoginScreen;
