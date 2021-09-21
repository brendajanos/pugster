/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Map from './Map.web';

const App = () => {
  return (
    <SafeAreaView>
      <Map
        initialLng={19.040528307070645}
        initialLat={47.50637626996388}
        initialZoom={15}
        onLocationChange={(lng, lat, zoom) => {}}
      />
    </SafeAreaView>
  );
};

export default App;
