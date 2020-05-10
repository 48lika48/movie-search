const body = document.querySelector('body');
const main = document.querySelector('main');

//set focus
function setFocus() {
  document.getElementById('input').focus();
}
window.onload = setFocus();
input.onblur = function blur() {
  document.getElementById('input').focus();
};

//add movies
let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
main.append(wrapper);
let movies = document.createElement('div');
movies.classList.add('movies');
wrapper.append(movies);

function fillFilmCards(films) {
  films.forEach((item)=>{
    // add movie
    let movie = document.createElement('div');
    movie.classList.add('movie');
    movie.classList.add('slider__item');
    movies.append(movie);
    // add titles
    let link = document.createElement('a');
    link.href = `https://www.imdb.com/title/${item.imdbID}/videogallery`;
    let title = document.createElement('div');
    link.append(title);
    title.classList.add('title');
    title.innerHTML = item.Title;
    movie.append(link);
    // add posters
    let poster = document.createElement('img');
    poster.classList.add('poster');
    poster.src = item.Poster;
    movie.append(poster);
    // add years
    let year = document.createElement('div');
    year.classList.add('year');
    year.innerHTML = item.Year;
    movie.append(year);
    // add star
    let star = document.createElement('div');
    star.classList.add('star');
    let starImg = document.createElement('img');
    starImg.src = 'img/star.png';
    let score = document.createElement('span');
    score.innerHTML = 8.4;
    star.append(starImg);
    star.append(score);
    movie.append(star);
  })
}

//API
let inputText = 'dream';
async function findFilms(inputText, page) {
  
  //translation
  const translate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200510T182941Z.10dc9ce1c0f7751b.057e8591548fb19379b2e0927318d75e825395f1&text=${inputText}&lang=ru-en`;
  const res = await fetch(translate);
  const data = await res.json();
  let translateWord = data.text[0];

  let url = `https://www.omdbapi.com/?apikey=7fe96ade&s=${translateWord}&page=${page}`;
  let response = await fetch(url);
  let obj = await response.json();
  return obj;
}
let promise = findFilms('dream', '1');
promise.then(result => {
  let films = result.Search;
  fillFilmCards(films);
});

//next value
let submit = document.getElementById('submit');
submit.addEventListener('click', function (event) {
  event.preventDefault();
  movies.style.transform = 'translateX(0)';
  counter = 0;
  inputText = input.value;
  movies.textContent = '';
  
  let promise = findFilms(inputText, page);
  promise.then(result => {
    if (result.Response == 'False') {
      document.getElementById('error').innerHTML = `No results for "${inputText}"`;
    }
    else {
      document.getElementById('error').innerHTML = '';
      let films = result.Search;
      fillFilmCards(films, '1');
    }
  });
})

// add switchers
let switcherLeft = document.createElement('img');
switcherLeft.classList.add('switcher-left');
switcherLeft.src = 'img/switcher_left.png';
let switcherRight = document.createElement('img');
switcherRight.classList.add('switcher-right');
switcherRight.src = 'img/switcher_right.png';
wrapper.append(switcherLeft);
wrapper.append(switcherRight);

let counter = 0;
let page = 1;
switcherRight.addEventListener('click', function(){
  counter ++;
  if(counter % 7 == 0){
    page ++;
    let promise = findFilms(inputText, page);
    promise.then(result => {
      let films = result.Search;
      fillFilmCards(films, page);
    });
  }
  let promise = findFilms(inputText, page);
    promise.then(result => {
      if((counter) < result.totalResults - 3){
        movies.style.transform = `translateX(${-317 * counter}px)`;
      }
    });
})
switcherLeft.addEventListener('click', function(){
  if(counter > 0){
    counter --;
    movies.style.transform = `translateX(${-317 * counter}px)`;
  }
})
