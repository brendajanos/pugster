import React from 'react';
import {View, StyleSheet} from 'react-native';
import Map from '../Map.web';

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
  },
  container: {
    left: 0,
    right: 0,
    position: 'absolute',
    top: 0,
    padding: 10,
  },
  map: {
    display: 'flex',
    flex: 1,
  },
  rect: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.map}>
        <Map
          initialLng={19.040528307070645}
          initialLat={47.50637626996388}
          initialZoom={15}
          onLocationChange={(lng, lat, zoom) => {}}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.rect}></View>
      </View>
    </View>
  );
};

export default HomeScreen;
