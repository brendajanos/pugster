/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {QueryClientProvider, QueryClient} from 'react-query';
import {SafeAreaView} from 'react-native';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <SafeAreaView style={{backgroundColor: 'transparent', flex: 1}}>
        <HomeScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
