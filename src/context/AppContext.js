import { useEffect, useState } from "react";

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

}