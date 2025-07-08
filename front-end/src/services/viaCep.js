import axios from 'axios'

async function findCep(cep) {
    
    const clearCep = cep.replace(/\D/g, '').slice(0, 8);
    const response = await axios.get(`http://viacep.com.br/ws/${clearCep}/json/`)

    if (response.data.erro) {
        throw new Error("CEP Não encontrado!!")
    }
    return response.data;
}

export default findCep;