const criptomonedasSelect = document.querySelector('#criptomonedas'),
    monedaSelect = document.querySelector('#moneda'),
    formulario = document.querySelector('#formulario'),
    resultado = document.querySelector('#resultado')

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () => {
    consultarAPICriptomonedas()

    formulario.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
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

function submitFormulario(e) {
    e.preventDefault()
    const { moneda, criptomoneda } = objBusqueda,
        resul = ((moneda && criptomoneda) === '')
            ? mostrarAlerta('ambos campos son obligatorios')
            : consultarAPI()
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value
}

function mostrarAlerta(msj) {
    const existeError = document.querySelector('.error')
    if (!existeError) {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('error')
        divMensaje.textContent = msj
        formulario.appendChild(divMensaje)

        setTimeout(() => {
            divMensaje.remove()
        }, 2000);
        return
    }
}

function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    fetch(url)
        .then(resolve => resolve.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion) {
    limpiarHTML()
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCTHOUR, LASTUPDATE } = cotizacion
    const precio = document.createElement('p')
    precio.classList.add('precio')
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`
    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `Precio mas alto del dia:<span>${HIGHDAY}</span>`
    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `Precio mas alto del dia:<span>${LOWDAY}</span>`
    const ultimasHoras = document.createElement('p')
    ultimasHoras.innerHTML = `Precio mas alto del dia:<span>${CHANGEPCTHOUR}</span>`
    const ultimaActualizacion = document.createElement('p')
    ultimaActualizacion.innerHTML = `Precio mas alto del dia:<span>${LASTUPDATE}</span>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}