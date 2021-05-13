const validarQuantidadeCaracteres = (valor, quantidade) => {
    if(valor.length < quantidade)
    return false
    return true
    }
    const validador = {};
    validador.validarQuantidadeCaracteres = validarQuantidadeCaracteres;
    module.exports = validador;