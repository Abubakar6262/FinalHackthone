import React, { useState } from 'react';
import { Card, Title, Paragraph, Button, Text, TextInput } from 'react-native-paper';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import proImage from '../../../assests/s1.jpeg'

const initialstate = {
    custName: '',
    custAddress: '',
    custZipCode: '',
}

const OrderScreen = () => {
    const [state, setState] = useState(initialstate)

    const route = useRoute();
    const { product } = route.params;


    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }))
    }

    const handleSubmit = () => {
            console.log(state);
            Alert.alert('Success', 'Your Order submitted successfully!');
        
    }

    return (
        <Card style={styles.card}>
            <Image source={proImage} style={styles.image} />
            <Card.Content style={styles.content}>
                <Title>{product.pname}</Title>
                <Paragraph>Category: {product.pcatagory}</Paragraph>
                <Paragraph>Price: ${product.pprice}</Paragraph>
                <Paragraph>Size: {product.psize}</Paragraph>
            </Card.Content>
            <View>
                <TextInput
                    label="Customer Name"
                    onChangeText={val => handleChange('custName', val)}
                    style={styles.input}
                />
                <TextInput
                    label="Address"
                    onChangeText={val => handleChange('custAddress', val)}
                    style={styles.input}
                />
                <TextInput
                    label="Zip Code"
                    onChangeText={val => handleChange('custZipCode', val)}
                    style={styles.input}
                />
            </View>
            <Button style={styles.buyNowButton} onPress={handleSubmit}>
                <Text style={styles.buttonText} >Confirm Order</Text>
            </Button>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

    },
    image: {
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 10,
    },
    buyNowButton: {
        backgroundColor: '#456123',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 12,
    }
});

export default OrderScreen;
