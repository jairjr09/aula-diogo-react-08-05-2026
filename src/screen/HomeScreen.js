import { View, Text, Button, StyleSheet } from "react-native"


export default function HomeScreen({navigation}){
    return(
        <View style={style.container}>
            <Text style={style.title}> Buscar CEP</Text>
            <Button
                title="Buscar CEP"
                onPress={()=> navigation.navigate('Cep')
                }
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold'
    }
});