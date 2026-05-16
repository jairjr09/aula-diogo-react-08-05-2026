import { Text, View, FlatList, StyleSheet, Button } from "react-native";
import { useApp } from "../context/AppContext";



export default function HistoricoScreen() {
    const { historico, limparHistorico } = useApp();

    function renderItem({ item }){
        return(
            <View style = {style.item}>
                <Text style={style.inStyle}>{item.cep}</Text>
                <Text style={style.inStyle}>{item.logradouro}</Text>
                <Text style={style.inStyle}>{item.bairro}</Text>
                <Text style={style.inStyle}>{item.localidade}</Text>
                <Text style={style.inStyle}>{item.uf}</Text>
            </View>
        )
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>Histórico de Busca</Text>
            {historico.length === 0 ? (
                <Text style={style.vazio}>Nenhuma busca realizada</Text>
            ) : (
                <>
                    <FlatList
                    data={historico}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{paddingBottom: 20}}
                    />

                    <Button
                        title="Limpar Histórico"
                        onPress={limparHistorico}
                        color="red"
                    />
                
                </>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    vazio: {
        color: '#888',
        textAlign: 'center',
        marginTop: 40
    },
    item: {
        backgroundColor: '#F8F8F8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        gap: 3
    },
    inStyle: {
        fontSize: 10
    }
})