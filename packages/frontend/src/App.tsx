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

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <HomeScreen />
    </QueryClientProvider>
  );
};

export default App;
