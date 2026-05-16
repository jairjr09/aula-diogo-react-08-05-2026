import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import CepScreen from '../screen/CepScreen';
import HistoricoScreen from '../screen/HistoricoScreen';
import GeoScreen from '../screen/GeoScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Cep" component={CepScreen}/>
                <Stack.Screen name="Historico" component={HistoricoScreen}/>
                <Stack.Screen name="Geo" component={GeoScreen}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}