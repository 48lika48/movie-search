const body = document.querySelector('body');
const main = document.querySelector('main');

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
