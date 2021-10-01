import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
//import MapboxGL from '@react-native-mapbox-gl/maps';

//MapboxGL.setAccessToken(process.env.MAPBOX_TOKEN as string);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const Map = () => {
  useEffect(() => {
    //MapboxGL.setTelemetryEnabled(false);
  }, []);

  return null; // <MapboxGL.MapView style={styles.map} />;
};

export default Map;
