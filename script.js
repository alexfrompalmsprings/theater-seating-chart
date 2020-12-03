// declaring all the elements and containers
const container = document.querySelector('.container');
// console.log(container);
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// console.log(seats);

const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');
const total = document.getElementById('total');

populateUI();

let ticketPrice = +movieSelect.value;


// -------------  all the functions  -------------

// set movie function; save movie price and index
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  // an array of all the selected seats
  let selectedSeats = document.querySelectorAll('.row .seat.selected');

  // create an with the indexes for the seats
  let seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  console.log(seatsIndex);

  // set to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // update the text and and the total (len * price)
  let selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage
function populateUI() {
  // populate the seats
  let selectedSeats = JSON.parse((localStorage.getItem('selectedSeats')));

  // not null and the len is greater than zero
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  // populate the film selected
  let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// -------------  all the event listeners  -------------

// change the movie
movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// event listener after clicking a selecting a seat
container.addEventListener('click', function (e) {
  // check for available seats
  if ((e.target.classList.contains('seat')) && (!e.target.classList.contains('occupied'))) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});


// intial count && total set
updateSelectedCount();