import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const DashboardPromt = () => {
  const [inputText, setInputText] = useState('');

  const handlePrompt = () => {
    Alert.alert(
      'Prompt Example',
      `You entered: ${inputText}`,
      [{ text: 'OK', onPress: () => setInputText('') }],
      { cancelable: false }
    
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Your scret..."
        value={inputText}
        onChangeText={text => setInputText(text)}
      />
      <Button title="Submit" onPress={handlePrompt} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default DashboardPromt;
