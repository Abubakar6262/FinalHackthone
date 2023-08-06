import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {

    const [curUserToken, setCurUserToken] = useState(null)

    useEffect(() => {
        checkAuthToken()
    }, [curUserToken])

    const checkAuthToken = async () => {

        try {
            const token = await AsyncStorage.getItem('jwt');
            if (token !== null) {
                setCurUserToken(token);
            } else {
                setCurUserToken(null);
            }
        } catch (error) {
            console.error('Error retrieving JWT token:', error);
        }
    }

    return (

        <AuthContext.Provider value={{ curUserToken, setCurUserToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider


export const useAuthContext = () => {
    return useContext(AuthContext);
}