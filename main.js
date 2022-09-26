const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
const movieImage = document.querySelector('.movie-img');

populateUI();
let ticketPrice = +movieSelect.value; //+ at the start is to convert value to a number

//Get data from local storage and populate UI

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    let movieName = movieSelect[movieSelect.selectedIndex].text;
     //setting stored selected movie index back to movieSelect
     if (movieName.includes('Avatar')) {
        movieImage.src = 'img/avatar.jpeg';
      } else if (movieName.includes('Joker')) {
        movieImage.src = 'img/joker.jpeg';
      } else if (movieName.includes('Star Wars')) {
        movieImage.src = 'img/starwars.jpeg';
      } else if (movieName.includes('Avengers')) {
        movieImage.src = 'img/avengers.jpeg';
      }
  }
  
}

// save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  let seatsCount = selectedSeats.length;
  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;
}

// less performant way would be using forEach on each seat and only show the clicked. Instead, I select the div which wraps all seats and  only show the elements (seats) clicked.
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount(); //once selections are made, update the function which calculates the number of seats and the total price of tickets.
  }
});

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value; // gets price (value) of the selected movie in number format
  setMovieData(e.target.selectedIndex, e.target.value); //runs the function to store selected movie name (e.target.selectedIndex) and price (e.target.value) to local storage
  let movieImg = e.target.options[e.target.selectedIndex].text; // select the movie name and changes the image accordingly
  if (movieImg.includes('Avatar')) {
    movieImage.src = 'img/avatar.jpeg';
  } else if (movieImg.includes('Joker')) {
    movieImage.src = 'img/joker.jpeg';
  } else if (movieImg.includes('Star Wars')) {
    movieImage.src = 'img/starwars.jpeg';
  } else if (movieImg.includes('Avengers')) {
    movieImage.src = 'img/avengers.jpeg';
  }
  updateSelectedCount();
});


updateSelectedCount();
