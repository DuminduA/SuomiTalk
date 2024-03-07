import React from 'react';
import { View, Text, Button } from 'react-native';
import loginStyles from '../styles/loginStyles';

const HomeScreen = ({ user, handleAuthentication }) => {
    return (
      <View style={loginStyles.authContainer}>
        <Text style={loginStyles.title}>Welcome</Text>
        <Text style={loginStyles.emailText}>{user.email}</Text>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    );
};

export default HomeScreen;
