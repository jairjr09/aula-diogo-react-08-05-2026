import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export function AppProvider({ children }){

    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        carregarHistorico();
    }, []);
    
    async function carregarHistorico() {
        try {
            const dados = await AsyncStorage.getItem('@historico_cep');
            if(dados){
                setHistorico(JSON.parse(dados));
            }
        } catch (error) {
            console.log('Error ao carregar historico', error);
        }
    }

    return false;

}

export function useApp(){
    return useContext(AppContext);
}