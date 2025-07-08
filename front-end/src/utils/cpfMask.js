function insertCpfMask(cpf) {
    return cpf
    .replace(/\D/g,'')
    .slice(0,11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
}

export default insertCpfMask;
