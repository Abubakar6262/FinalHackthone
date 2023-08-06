import React, { useState } from 'react'
import { View, StyleSheet, Button, Alert, ImageBackground, Text } from 'react-native'
import { TextInput } from 'react-native-paper';

import background from '../../assests/background.jpg'

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState({})


    const handleChange = (name, val) => {
        setEmail(s => ({ ...s, [name]: val }))
    }
    const handleSignIn = () => {
      console.log(email);
      Alert.alert('Error', 'Password is sent on user email');
       
    };


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

                <Button style={Styles.btn} color={'#2a9d8f'} title="Send Password" onPress={handleSignIn} />

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
        textDecorationLine:'underline',
    }
})