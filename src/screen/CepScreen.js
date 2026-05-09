import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"

import api from '../service/api';

export default function CepScreen(){
    const [cep, setCep] = useState('');
    const [dados, setDados] = useState(null);

    async function buscarCep() {
        try{
            const response = await api.get(`/${cep}/json`);
            console.log(response.data)
            setDados(response.data);
        } catch (error) {
            alert('Erro ao buscar CEP')
        }
    }
    
    return(
        <View style={style.container}>
            <Text style={style.title}>Buscar CEP</Text>
            <TextInput 
                placeholder="Digite o CEP"
                style={style.input}
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
            />
            <Button 
                title="Buscar"
                onPress={buscarCep}
            />

            {dados && (
                <View style={style.resultado}>
                    <Text>Rua: {dados.logradouro}</Text>
                    <Text>Bairro: {dados.bairro}</Text>
                    <Text>Cidade: {dados.localidade}</Text>
                    <Text>Estado: {dados.uf}</Text>
                </View>
            )}

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    },
    resultado: {
        marginTop: 20,
        gap: 5
    }
})