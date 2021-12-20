import * as React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CardList from './screens/cardlist';
import CardDetail from './screens/carddetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CardList" component={CardList} />
          <Stack.Screen name="CardDetail" component={CardDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
