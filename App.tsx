/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Home from './components/Home';
import Child from './components/Child';
import {store, persistor} from "./store/index";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home" >
     <Stack.Screen  options={{headerShown: false,statusBarStyle: "light"}}  name="Home" component={Home} />
     <Stack.Screen options={{headerShown: false,statusBarStyle: "light"}} name="Child" component={Child} />
     </Stack.Navigator>
   </NavigationContainer>
   </PersistGate>
   </Provider>
  );
};



export default App;
