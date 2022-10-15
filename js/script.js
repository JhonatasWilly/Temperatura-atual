const apiKey = 'c596258f46701588d984b9b28a103336'
const apiCountryURL = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#cityName')
const cityRigthElemnt = document.querySelector('#city-name-right')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')
const pressureElement = document.querySelector('#pressure span')
const temperaturaMaxElement = document.querySelector('#temperatura-max span')
const temperaturaMinElement = document.querySelector('#temperatura-min span')

const weatherContainer = document.querySelector('#weather-data')

// Funções
const getWeather = async city => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  console.log(data)

  return data
}

setTimeout(function () {
  cityInput.setAttribute('value', 'Hawaii')
  cityRigthElemnt.textContent = 'Hawaii'
  searchBtn.click()
}, 100)

const showWeatherData = async city => {
  const data = await getWeather(city)
  if (data.cod == '404') {
    cityElement.innerText = 'Not found!'
    cityRigthElemnt.innerText = 'Not found!'
    tempElement.innerText = '?'
    if (confirm('Sorry! Nothing was found for your search. ') == true) {
      document.location.reload(true)
    } else {
      alert('Check spelling. \nExample: "Tokyo"')
    }
  } else {
    cityElement.innerText = data.name
    cityRigthElemnt.innerText = data.name
    pressureElement.innerText = data.main.pressure
    temperaturaMaxElement.innerText = data.main.temp_max
    temperaturaMinElement.innerText = data.main.temp_min
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    )
    console.log(data.sys.country)
    countryElement.setAttribute('src', apiCountryURL + data.sys.country)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`
  }

  country = data.name
  showBackground(country)
  weatherContainer.classList.remove('hide')
}

// Eventos
searchBtn.addEventListener('click', e => {
  e.preventDefault()

  const city = cityInput.value

  showWeatherData(city)
})

cityInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const city = e.target.value

    showWeatherData(city)
  }
})

const showBackground = async country => {
  let clientId = `xlVCkZjgoUxeO5hBdCaq8zIw3E6zAEn3JxhqYqhVSuQ`
  let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${country}`

  fetch(url)
    .then(function (data) {
      return data.json()
    })
    .then(function (data) {
      let random = Math.floor(Math.random() * 11)
      let result = data.results[random].urls.full
      $('body').css('background-image', 'url(' + result + ')')
    })
}
