import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        carregarHistorico();
    }, []);

    async function carregarHistorico() {
        try {
            const dados = await AsyncStorage.getItem('@historico_cep');
            if (dados) {
                setHistorico(JSON.parse(dados));
            }
        } catch (error) {
            console.log('Error ao carregar historico', error);
        }
    }


    async function adicionarHistorico(item) {
        try {
            const novoHistorico = [item, ...historico];
            setHistorico(novoHistorico);
            await AsyncStorage.setItem('@historico_cep', JSON.stringify(novoHistorico))
        } catch (error) {
            console.log('Erro ao salvar histórico', error);
        }
    }

    async function limparHistorico(){
        try{
            setHistorico([]);
            await AsyncStorage.removeItem('@historico_cep');
        } catch (error) {
            console.log('Erro ao limpar histórico', error);
        }
    }

    return (
        <AppContext.Provider value={{ historico, adicionarHistorico, limparHistorico }}>
            {children}
        </AppContext.Provider>
    )

}

export function useApp() {
    return useContext(AppContext);
}