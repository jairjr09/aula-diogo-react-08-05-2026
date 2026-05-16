import { useState } from "react"
import { View, Button, Text } from "react-native";

import * as Location from 'expo-location';

export default function GeoScreen(){

    const [location, setLocation] = useState(null);

    async function obterLocalizacao(){

        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if(status !== 'granted'){
            alert('Permissão negada!');
            return;
        }

        const response = await Location.getCurrentPositionAsync({});
        setLocation(response);
        console.log(response);

    }

    return (
        <View>
            <Text>Geolocalização</Text>
            <Button
                title="Obter Localização"
                onPress={obterLocalizacao}
            />
        </View>
    )
}