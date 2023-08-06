import React, { useState } from 'react'
import axios from 'axios';
import { View, StyleSheet, Button, Alert, ImageBackground, Text, ScrollView } from 'react-native'
import { ActivityIndicator, TextInput } from 'react-native-paper';
// import CryptoJS from 'crypto-js';

import background from '../../assests/background.jpg'
import { useNavigation } from '@react-navigation/native';


const initialstate = {
  uname: '',
  city: '',
  email: '',
  password: '',
  cpassword: '',
}
export default function SignUp() {
  const [state, setState] = useState(initialstate)

  const [passwordShow, setPasswordShow] = useState(true)
  const [cpasswordShow, setCPasswordShow] = useState(true)
  const [isprocessing, setIsProcessing] = useState(false)

  const navigation = useNavigation();


  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }))
  }
  const handleSignUp = () => {
    let { email, password, cpassword, uname, city } = state


    if (email && uname && city) {
      if (password === cpassword) {
        const myuser = { uname, email, city, password }
        setIsProcessing(true)
        try {
          axios.post('http://10.0.2.2:8000/account/users', myuser)
            .then((res) => {
              console.log(res.data);
              const checkvalid = res.data.message
              if (checkvalid === 'user register success') {
                Alert.alert('success', 'user registered');
                navigation.navigate('SignIn')
              } else {
                Alert.alert('Error', 'user can not registered');
              }
            })
            .catch((err) => {
              console.log('err', err)
              Alert.alert('error', 'user cannot registered');
            })
            .finally(() => {
              setIsProcessing(false)
            })
        } catch (error) {
          console.log('Not request gone', error)
        }
        // navigation.navigate('Login')

      }
      else {
        Alert.alert('Error', 'Password cannot matched');
      }
    } else {
      Alert.alert('Error', 'Please fill all input fields');

    }
  };

  const TogglePassword = () => {
    setPasswordShow(!passwordShow)
  }
  //This is for Confirm password shown
  const confirmTogglePassword = () => {
    setCPasswordShow(!cpasswordShow)
  }

  return (
    <ImageBackground source={background} style={Styles.signinview}>
      <ScrollView>

        <View>
          <Text style={Styles.h1}>
            Register
          </Text>
          <TextInput
            style={Styles.input}
            placeholder="User Name"
            placeholderTextColor='black'
            onChangeText={val => handleChange('uname', val)}
            autoCapitalize="none"
          />
          <TextInput
            style={Styles.input}
            placeholder="City"
            placeholderTextColor='black'
            onChangeText={val => handleChange('city', val)}
            autoCapitalize="none"
          />
          <TextInput
            style={Styles.input}
            placeholder="Email"
            placeholderTextColor='black'
            onChangeText={val => handleChange('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={Styles.input}
            placeholder="Password"
            placeholderTextColor='black'
            right={<TextInput.Icon icon={passwordShow ? "eye" : "eye-off"} onPress={TogglePassword} />}
            onChangeText={val => handleChange('password', val)}
            secureTextEntry={passwordShow}
          />
          <TextInput
            style={Styles.input}
            placeholder="Confirm Password"
            placeholderTextColor='black'
            right={<TextInput.Icon icon={cpasswordShow ? "eye" : "eye-off"} onPress={confirmTogglePassword} />}
            onChangeText={val => handleChange('cpassword', val)}
            secureTextEntry={cpasswordShow}
          />
          <View style={{ width: '50%', marginBottom: 15 }}>
            <Text
              style={Styles.spanText}
              // onPress={ navigation.navigate('Login') }>
              onPress={() => navigation.goBack()}>
              Already have account...
            </Text>
          </View>
          {!isprocessing
            ? <Button style={Styles.btn} color={'#2a9d8f'} title="Register" onPress={handleSignUp} />
            : <ActivityIndicator color="blue" size="small" />

          }


        </View>
      </ScrollView>
    </ImageBackground >
  )
}

const Styles = StyleSheet.create({
  signinview: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  input: {
    color: 'white',
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  btn: {
    borderWidth: 1,
    borderColor: 'none',
    borderRadius: '50%',
  },
  spanText: {
    fontSize: 15,
    color: '#219ebc',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'white'
  }
})