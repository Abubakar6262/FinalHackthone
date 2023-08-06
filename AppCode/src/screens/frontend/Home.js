import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from 'react-native'
import { useAuthContext } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// Components
import ImageHandler from './components/ImageHandle'
import CartImageItem from './components/CartImageItem';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';

// assests
import imageSource from '../../assests/s1.jpeg'

export default function Home({ navigation, onSearch }) {

  const { curUserToken, setCurUserToken } = useAuthContext()
  const [isProcessig, setIsProcessing] = useState(false)

  const [searchText, setSearchText] = useState('');



  // const [user, setUser] = useState({ userId: "", userEmail: "" })

  // Getting user data by Decoding token 
  try {
    if (curUserToken !== null) {
      const decodedToken = jwtDecode(curUserToken);
      const userId = decodedToken.id;
      const userEmail = decodedToken.email;

      // setUser({ userId, userEmail })
      // console.log('user data goes here =>', user);
    } else {
      console.log('Token value is empty =>');
    }

  } catch (error) {
    console.log('Somthing went wron in gettin Token =>', error);
  }


  // Data get by AsyncStorage 
  // const getDataAsync = async () => {
  //   const userdata = await AsyncStorage.getItem('jwt');
  //   console.log('User data that is stored in aysnc storage =>', userdata);
  // }

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleLogOut = async () => {
    setIsProcessing(true)
    try {
      await AsyncStorage.removeItem('jwt');
      setCurUserToken(null)
    } catch (err) {
      console.log('somthing went wrong => ', err);
    }
    setIsProcessing(false)
    navigation.navigate('SignIn', { screen: 'SignIn' });
  }

  

  return (
    <ScrollView>
      <View style={styles.container} >
        {!isProcessig
          ? (<>
            <View style={styles.HeaderofHome}>
            <Button style={styles.buttonContainer} title='Logout' onPress={() => handleLogOut()}></Button>
            </View>
            {/* <View>
              <ImageHandler />
            </View> */}


            <View style={styles.searchBar}>
              <TextInput
                style={styles.input}
                placeholder="Search products..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
              <Button title="Search" onPress={handleSearch} />
            </View>

            <View >
              <CartImageItem/>
            </View>

          </>)
          : <ActivityIndicator color="blue" size="small" />
        }
      </View >

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:50,
  },
  searchBar: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 3,
  },
  HeaderofHome:{
    width:'100%',
    height:50,
    backgroundColor:'#456123'
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});