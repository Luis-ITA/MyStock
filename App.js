import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Provider from './components/Provider';
import Products from './components/Products';
import Store from './components/Store';
import editProvider from './components/editProvider';
import editProduct from './components/editProduct';
import showProductStore from './components/showProductStore';
import addProduct from './components/addProduct';
import addStore from './components/addStore';
import addProvider from './components/addProvider';
import editStore from './components/editStore';
import deleteStore from './components/deleteStore';
import Input from './components/Input';
import Output from './components/Output';
import inputProduct from './components/inputProduct';
import outputProduct from './components/outputProduct';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Provider" component={Provider} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="Input" component={Input} />
      <Stack.Screen name="Output" component={Output} />
      <Stack.Screen name="editProvider" component={editProvider} />
      <Stack.Screen name="editProduct" component={editProduct} />
      <Stack.Screen name="editStore" component={editStore} />
      <Stack.Screen name="showProductStore" component={showProductStore} />
      <Stack.Screen name="addProduct" component={addProduct} />
      <Stack.Screen name="addStore" component={addStore} />
      <Stack.Screen name="deleteStore" component={deleteStore} />
      <Stack.Screen name="addProvider" component={addProvider} />
      <Stack.Screen name="inputProduct" component={inputProduct} />
      <Stack.Screen name="outputProduct" component={outputProduct} />


    </Stack.Navigator>
    </NavigationContainer>

  );
}
export default App;
