import { use, useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native"

import api from '../service/api';
import { useApp } from "../context/AppContext";

export default function CepScreen({ navigation }){
    const [cep, setCep] = useState('');
    const [dados, setDados] = useState(null);

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState();

    const { adicionarHistorico } = useApp();

    function handleChangeCep(texto) {
        if(cep.length !== 8){
            const apenasNumero = texto.replace(/\D/g, '').slice(0, 8);
            setCep(apenasNumero);
        }
    }

    async function buscarCep() {
        
        if(cep.length !== 8){
            setErro('Digite um CEP válido com 8 digitos.');
            return;
        }

        setErro('');
        setLoading(true);

        try{
            const response = await api.get(`/${cep}/json`);
            if(response.data.erro){
                setErro('CEP não encontrado');
                setDados(null);
            } else {
                setDados(response.data);
                adicionarHistorico(response.data);
            }
        } catch (error) {
            setErro('Erro ao buscar CEP')
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <View style={style.container}>
            <Text style={style.title}>Buscar CEP</Text>
            <TextInput 
                placeholder="Digite o CEP"
                style={style.input}
                value={cep}
                onChangeText={handleChangeCep}
                keyboardType="numeric"
                maxLength={8}
            />
            <Button 
                title="Buscar"
                onPress={buscarCep}
            />

            {erro !== '' && (
                <Text style={style.erro}>{erro}</Text>
            )}

            {loading && (
                <ActivityIndicator size={"large"} color="#FF0000" style={{marginTop: 20}}/>
            )}

            {dados && (
                <View style={style.resultado}>
                    <Text>Rua: {dados.logradouro}</Text>
                    <Text>Bairro: {dados.bairro}</Text>
                    <Text>Cidade: {dados.localidade}</Text>
                    <Text>Estado: {dados.uf}</Text>
                </View>
            )}

            <View style={{marginTop: 20}}>
                <Button
                    title="Ver Historico"
                    onPress={() => navigation.navigate('Historico')}
                    color="#666"
                />
            </View>

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
    },
    erro:{
        color: "red",
        marginTop: 10
    }
})