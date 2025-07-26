import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditCardScreen from '../screens/EditCardScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import CardsListScreen from '../screens/CardsListScreen';
import AddCardScreen from '../screens/AddCardScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CardsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="CardsList"
        component={CardsListScreen}
        options={{ title: 'My Gift Cards' }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{ title: 'Add New Card', headerShown: false }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={{ title: 'Card Details', headerShown: false }}
      />
      <Stack.Screen
        name="EditCard"
        component={EditCardScreen}
        options={{ title: 'Edit Card', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
