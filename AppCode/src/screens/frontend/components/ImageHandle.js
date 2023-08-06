import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Button, Image } from 'react-native';

const App = () => {
  const [imageUri, setImageUri] = useState(null);

 
  const handleAddImage = async () => {
    // Logic to open the camera or select an image
    // For simplicity, you can replace this with any method to get the image URI
    const uri = 'path_to_your_image.jpg'; // Replace with the actual image URI

    setImageUri(uri);
    // Send the image URI to your Node.js server to save in MongoDB
  };

  return (
    <View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Image" onPress={handleAddImage} />
    </View>
  );
};

export default App;
