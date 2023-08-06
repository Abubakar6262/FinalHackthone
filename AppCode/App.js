import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { View,StyleSheet } from 'react-native'
import AuthContextProvider from './src/contexts/AuthContext'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000);
  }, [])

  return (
    <>
      <AuthContextProvider>

        {isLoading
          ? <View style={styles.container}>
            <ActivityIndicator animating={true} size={50}  color={'46613f'} />
          </View>
          : <AppNavigator />
        }

      </AuthContextProvider>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
  },
});