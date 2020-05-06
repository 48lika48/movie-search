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

let films = [
    {Title: "Requiem for a Dream", Year: "2000", Poster: "img/Requiem_for_a_dream.jpg", Score: "8.3"},
    {Title: "A Nightmare on Elm Street", Year: "1987", Poster: "img/A_Nightmare_on_Elm_Street.jpg", Score: "6.6"},
    {Title: "Dream House", Year: "2011", Poster: "img/Dream_House.jpeg", Score: "6.0"},
    {Title: "Goal! The Dream Begins", Year: "2005", Poster: "img/Goal!_The_Dream_Begins.jpg", Score: "6.7"},
    {Title: "Requiem for a Dream", Year: "2000", Poster: "img/Requiem_for_a_dream.jpg", Score: "8.3"},
    {Title: "A Nightmare on Elm Street", Year: "1987", Poster: "img/A_Nightmare_on_Elm_Street.jpg", Score: "6.6"},
    {Title: "Dream House", Year: "2011", Poster: "img/Dream_House.jpeg", Score: "6.0"},
    {Title: "Goal! The Dream Begins", Year: "2005", Poster: "img/Goal!_The_Dream_Begins.jpg", Score: "6.7"}
]

films.forEach((item)=>{
    // add movie
    let movie = document.createElement('div');
    movie.classList.add('movie');
    movie.classList.add('slider__item');
    movies.append(movie);
    // add titles
    let title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = item.Title;
    movie.append(title);
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

// add switchers
let switcherLeft = document.createElement('img');
switcherLeft.classList.add('switcher-left');
switcherLeft.src = 'img/switcher_left.png';
let switcherRight = document.createElement('img');
switcherRight.classList.add('switcher-right');
switcherRight.src = 'img/switcher_right.png';
wrapper.append(switcherLeft);
wrapper.append(switcherRight);

// slider
wrapper.classList.add('slider');
movies.classList.add('slider__wrapper');
switcherLeft.classList.add('slider__control');
switcherLeft.classList.add('slider__control_left');
switcherRight.classList.add('slider__control');
switcherRight.classList.add('slider__control_right');
switcherRight.classList.add('slider__control_show');

let multiItemSlider = (function () {
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
        _transform = 0, // значение транфсофрмации .slider_wrapper
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
