function insertCepMask (cep) {
    return cep
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{3})/g, "$1-$2")
}

export default insertCepMask;