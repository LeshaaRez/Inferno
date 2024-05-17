import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

const App = () => {
  return (
    <ImageBackground source={require('./assets/background/Ellipse3.png')} style={styles.container}>
      <View style={styles.header}>
        {}
      </View>
      <Image source={require('./assets/logo_images/image2.png')} style={styles.logo} />
      <Image source={require('./assets/logo_images/inferno_text.png')} style={styles.textLogo} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%', 
    height: 300, 
    position: 'relative',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    position: 'absolute',
    top: 200,
    left: '50%',
    marginLeft: -125, 
  },
  textLogo: {
    position: 'absolute',
    top: 425, // высота
    width: 172, // ширина текста
    height: 43, // высота текста
    resizeMode: 'contain',
  }
});

export default App;
