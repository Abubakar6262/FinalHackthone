import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card, Paragraph, Text, Title } from 'react-native-paper';
import image from '../../../assests/s1.jpeg';
import { useNavigation } from '@react-navigation/native';



const CartImageItem = () => {
  const [products, setProducts] = useState([])
  const [isprocessing, setIsProcessing] = useState(true)
  const navigation = useNavigation();
  // Product getting from database
  useEffect(() => {
    axios.get("http://10.0.2.2:8000/product/addproduct/getproduct")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data)
      })
      .catch((err) => {
        console.log('Somthing went wrong =>', err);
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }, [])

  // const goToOrder = () => {


  // }

  return (
    <>
      {isprocessing
        ? <ActivityIndicator color="blue" size="large" style={{ marginTop: 50 }} />
        : <>
          <ScrollView contentContainerStyle={styles.container1}>
            {products.map((product) => (
              <Card key={product._id} style={styles.card}>
                <Card.Cover source={image} style={styles.image} />
                <Card.Content>
                  <Title>{product.pname}</Title>
                  <Paragraph>{product.pcatagory}</Paragraph>
                  <Paragraph>$:{product.pprice}</Paragraph>
                  <Button style={styles.buyNowButton} onPress={()=>navigation.navigate('Orders', { product })}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                  </Button>
                  <View>
                    
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </>
      }


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 20,

    minWidth: '48%',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 0,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },

  container1: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
  image: {
    height: 200,
  },
  buyNowButton: {
    backgroundColor: '#456123',
    paddingVertical: 10,
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
});

export default CartImageItem;
