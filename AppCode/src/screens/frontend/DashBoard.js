import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import Imagescr from '../../assests/s1.jpeg'

const initialstate = {
    pname: '',
    pcatagory: '',
    pcolor: '',
    pprice: null,
    psize: '',
}
const ProductAddForm = () => {
    const [state, setState] = useState(initialstate)
    const [isprocessing, setIsProcessing] = useState(false)


    // const headerDrawer = () => {

    // }

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)
        setIsProcessing(true)
        axios.post('http://10.0.2.2:8000/product/addproduct', state)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log('Somthing went wrong', err);
            })
            .finally(() => {
                setIsProcessing(false)
            })

    };


    return (
        <ScrollView>
            <View style={styles.Header}>

            </View>

            <View style={styles.container}>
                <View >
                    <Text style={styles.addprotext}>Add Product</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={val => handleChange('pname', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Catagory"
                    onChangeText={val => handleChange('pcatagory', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    onChangeText={val => handleChange('pprice', val)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    onChangeText={val => handleChange('pcolor', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Size"
                    onChangeText={val => handleChange('psize', val)}
                />
                {/* Add image input component */}
                {!isprocessing
                    ? <Button title="Submit" onPress={handleSubmit} />
                    : <ActivityIndicator color="blue" size="small" />
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    addprotext: {
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 30

    },
    Header: {
        with: '100%',
        height: 50,
        backgroundColor: '#465132'
    }
});

export default ProductAddForm;
