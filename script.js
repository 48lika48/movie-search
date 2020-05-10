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
async function findFilms(inputText, page) {
  let url = `http://www.omdbapi.com/?apikey=7fe96ade&s=${inputText}&page=${page}`;
  let response = await fetch(url);
  let obj = await response.json();
  return obj;
}
let promise = findFilms('dream', '1');
promise.then(result => {
  let films = result.Search;
  fillFilmCards(films);

// slider
let multiItemSlider = (function () {
wrapper.classList.add('slider');
movies.classList.add('slider__wrapper');
switcherLeft.classList.add('slider__control');
switcherLeft.classList.add('slider__control_left');
switcherRight.classList.add('slider__control');
switcherRight.classList.add('slider__control_right');
switcherRight.classList.add('slider__control_show');
    return function (selector, config) {
        let
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсформации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 121.9, // величина шага (для трансформации)
        _items = []; // массив элементов
        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        let position = {
            getMin: 0,
            getMax: _items.length - 1,
        }

        let _transformItem = function (direction) {
        if (direction === 'right') {
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!_sliderControlLeft.classList.contains('slider__control_show')) {
            _sliderControlLeft.classList.add('slider__control_show');
          }
          if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
            _sliderControlRight.classList.remove('slider__control_show');
          }
          _positionLeftItem++;
          _transform -= _step;
        }
        if (direction === 'left') {
          if (_positionLeftItem <= position.getMin) {
            return;
          }
          if (!_sliderControlRight.classList.contains('slider__control_show')) {
            _sliderControlRight.classList.add('slider__control_show');
          }
          if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
            _sliderControlLeft.classList.remove('slider__control_show');
          }
          _positionLeftItem--;
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед"
        let _controlClick = function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
          }
        };

        let _setUpListeners = function () {
          // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для события click
          _sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
        }

        // инициализация
        _setUpListeners();

        return {
          right: function () { // метод right
            _transformItem('right');
          },
          left: function () { // метод left
            _transformItem('left');
          }
        }
    }
}());

let slider = multiItemSlider('.slider')

});

//next value
let submit = document.getElementById('submit');
submit.addEventListener('click', function (event) {
  event.preventDefault();
  let inputText = input.value;
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
// slider
let multiItemSlider = (function () {
wrapper.classList.add('slider');
movies.classList.add('slider__wrapper');
switcherLeft.classList.add('slider__control');
switcherLeft.classList.add('slider__control_left');
switcherRight.classList.add('slider__control');
switcherRight.classList.add('slider__control_right');
switcherRight.classList.add('slider__control_show');
    return function (selector, config) {
        let
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсформации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 122, // величина шага (для трансформации)
        _items = []; // массив элементов
        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        let position = {
            getMin: 0,
            getMax: _items.length - 1,
        }

        let _transformItem = function (direction) {
        if (direction === 'right') {
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!_sliderControlLeft.classList.contains('slider__control_show')) {
            _sliderControlLeft.classList.add('slider__control_show');
          }
          if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
            _sliderControlRight.classList.remove('slider__control_show');
          }
          _positionLeftItem++;
          _transform -= _step;
        }
        if (direction === 'left') {
          if (_positionLeftItem <= position.getMin) {
            return;
          }
          if (!_sliderControlRight.classList.contains('slider__control_show')) {
            _sliderControlRight.classList.add('slider__control_show');
          }
          if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
            _sliderControlLeft.classList.remove('slider__control_show');
          }
          _positionLeftItem--;
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед"
        let _controlClick = function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
          }
        };

        let _setUpListeners = function () {
          // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для события click
          _sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
        }

        // инициализация
        _setUpListeners();

        return {
          right: function () { // метод right
            _transformItem('right');
          },
          left: function () { // метод left
            _transformItem('left');
          }
        }
    }
}());

let slider = multiItemSlider('.slider')

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

let inputText = 'dream';
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
    
    // slider
    let multiItemSlider = (function () {
    wrapper.classList.add('slider');
    movies.classList.add('slider__wrapper');
    switcherLeft.classList.add('slider__control');
    switcherLeft.classList.add('slider__control_left');
    switcherRight.classList.add('slider__control');
    switcherRight.classList.add('slider__control_right');
    switcherRight.classList.add('slider__control_show');
        return function (selector, config) {
            let
            _mainElement = document.querySelector(selector), // основный элемент блока
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
            _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
            _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
            _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
            _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
            _positionLeftItem = 0, // позиция левого активного элемента
            _transform = 0, // значение транфсформации .slider_wrapper
            _step = _itemWidth / _wrapperWidth * 121.9, // величина шага (для трансформации)
            _items = []; // массив элементов
            // наполнение массива _items
            _sliderItems.forEach(function (item, index) {
                _items.push({ item: item, position: index, transform: 0 });
            });
    
            let position = {
                getMin: 0,
                getMax: _items.length - 1,
            }
    
            let _transformItem = function (direction) {
            if (direction === 'right') {
              if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
                return;
              }
              if (!_sliderControlLeft.classList.contains('slider__control_show')) {
                _sliderControlLeft.classList.add('slider__control_show');
              }
              if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
                _sliderControlRight.classList.remove('slider__control_show');
              }
              _positionLeftItem++;
              _transform -= _step;
            }
            if (direction === 'left') {
              if (_positionLeftItem <= position.getMin) {
                return;
              }
              if (!_sliderControlRight.classList.contains('slider__control_show')) {
                _sliderControlRight.classList.add('slider__control_show');
              }
              if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
                _sliderControlLeft.classList.remove('slider__control_show');
              }
              _positionLeftItem--;
              _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
            }
    
            // обработчик события click для кнопок "назад" и "вперед"
            let _controlClick = function (e) {
              if (e.target.classList.contains('slider__control')) {
                e.preventDefault();
                let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                _transformItem(direction);
              }
            };
    
            let _setUpListeners = function () {
              // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для события click
              _sliderControls.forEach(function (item) {
                item.addEventListener('click', _controlClick);
              });
            }
    
            // инициализация
            _setUpListeners();
    
            return {
              right: function () { // метод right
                _transformItem('right');
              },
              left: function () { // метод left
                _transformItem('left');
              }
            }
        }
    }());
    
    let slider = multiItemSlider('.slider')
    
    });
  }
})
switcherLeft.addEventListener('click', function(){
  if(counter > 0){
    counter --;
  }
})