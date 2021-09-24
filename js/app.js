const criptomonedasSelect = document.querySelector('#criptomonedas'),
    monedaSelect = document.querySelector('#moneda'),
    formulario = document.querySelector('#formulario')

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () => {
    consultarAPICriptomonedas()

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor)
})


//crear Promise que obtiene las criptos
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})
function consultarAPICriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
        .then(resolve => resolve.json())
        .then(resolve => obtenerCriptomonedas(resolve.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}
function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo

        const option = document.createElement('option')
        option.value = Name
        option.textContent = FullName
        criptomonedasSelect.appendChild(option)
    });
}

function submitFormulario() {
    e.preventDefault()
    console.log(moneda, criptomoneda)
}

function leerValor(e) {
    console.log(objBusqueda)
}