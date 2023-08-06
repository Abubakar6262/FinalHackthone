import axios from 'axios';
import React, { useState } from 'react'
import { View, StyleSheet, Button, Alert, ImageBackground, Text } from 'react-native'
import { ActivityIndicator, TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../../assests/background.jpg'
import { useAuthContext } from '../../contexts/AuthContext';


const initialstate = {
    email: '',
    password: '',
}


export default function SignIn({ navigation }) {
    const [state, setState] = useState(initialstate)
    const [passwordShow, setPasswordShow] = useState(true)
    const [isprocessing, setIsProcessing] = useState(false)

    const { setCurUserToken } = useAuthContext()

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }))
    }

    const handleSignIn = async ({ navigation }) => {
        setIsProcessing(true)
        // abc@gmail.com
        // 123123
        //  Route to signin user and check validation perform
        console.log('My user for sign in =>', state);
        await axios.post('http://10.0.2.2:8000/account/users/login', state)
            .then(async (res) => {
                const checkToken = res.data.token
                console.log(checkToken);
                if (checkToken && checkToken !== null) {
                    // jwt store in asyncStorage for future use

                    await AsyncStorage.setItem('jwt', checkToken);
                    // console.warn('Data store in Asyncstorage')
                    setCurUserToken(checkToken)

                    Alert.alert('Success', 'You have signed in successfully!');
                    set
                    navigation.navigate('Home')
                } else {
                    Alert.alert('Error', 'Invalid userEmail or Password');
                }
            })
            .catch((err) => { console.log('Something went wrong =>', err); })
            .finally(() => { setIsProcessing(false) })

    };

    const TogglePassword = () => {
        setPasswordShow(!passwordShow)
    }

    return (
        <ImageBackground source={background} style={Styles.signinview}>
            <View >
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
                <View style={{ width: '100%', marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={Styles.spanText}
                        onPress={() => { navigation.navigate('Register') }}>
                        Register Now...
                    </Text>
                    <Text
                        style={Styles.spanText}
                        onPress={() => { navigation.navigate('ForgotPass') }}>
                        Forgot Password
                    </Text>
                </View>
                {!isprocessing
                    ? <Button style={Styles.btn} color={'#2a9d8f'} title="Sign In" onPress={handleSignIn} />
                    : <ActivityIndicator color="blue" size="small" />

                }
            </View>
        </ImageBackground >
    )
}

const Styles = StyleSheet.create({
    signinview: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12,
        // backgroundColor: '#1d3557'

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
    }
})