'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const  renderCuntryData = function(data, className = '') {
  console.log('data is ', data);
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common || data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)].name}</p>
    </div>
  </article>
`;
countriesContainer.insertAdjacentHTML('beforeend',html)
countriesContainer.style.opacity = 1;
}

const getCountryAndNaighborsData = function(contryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${contryName}`);
  request.send();

  request.addEventListener('load', function(){
      const [data] = JSON.parse(this.responseText)

      // Render the country
      renderCuntryData(data);

      // // neighbour
      // const [neighbour] = data.borders
      // if(!neighbour) return;
      // const request2 = new XMLHttpRequest();
      // request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
      // request2.send();

      // request2.addEventListener('load', function(){
      //   const [data2] = JSON.parse(this.responseText);
      //   console.log('data 2 is', data2);

      //   renderCuntryData(data2, 'neighbour');
      // })

  })
}

const getCountryUsingPromise = (contryName) =>{
  fetch(`https://restcountries.com/v3.1/name/${contryName}`)
  .then(response => response.json())
  .then(data =>{
      console.log('data', data);
      renderCuntryData(data[0]);
      const neighbour = data[0].borders[0];
      if(!neighbour) return
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    }
  ).then(response => response.json())
  .then(data => renderCuntryData(data, 'neighbour'))
}
getCountryUsingPromise('germany')