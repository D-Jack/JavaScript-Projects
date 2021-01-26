const addMovieModal = document.getElementById("add-modal");
const toggleMovieBtn = document.querySelector("header button");
const backdropEl = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const storeAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputsMovie = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const movieList = [];

const updateEntrySection = () => {
  if (movieList.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const renderNewMovieElement = (title, image, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${image}" alt=${title}>
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</h2>
  </div>
  `;

  const movieul = document.getElementById('movie-list');
  movieul.appendChild(newMovieElement);
};
const togglebackdropHandler = () => {
  backdropEl.classList.toggle("visible");
};

const toggleMovieHandler = () => {
  addMovieModal.classList.toggle("visible");
  togglebackdropHandler();
};

const clearMovieInputEntries = () => {
  for (const usrinput of userInputsMovie) {
    usrinput.value = "";
  }
};
const storeAddMovieHandler = () => {
  const titleMovievalue = userInputsMovie[0].value;
  const imageUrlMovievalue = userInputsMovie[1].value;
  const ratingMovievalue = userInputsMovie[2].value;
  if (
    titleMovievalue.trim() === "" ||
    imageUrlMovievalue.trim() === "" ||
    ratingMovievalue.trim() === "" ||
    ratingMovievalue < 1 ||
    +ratingMovievalue > 5
  ) {
    alert("Plaese Enter Valid Input (rating should be between 1-5).");
    return;
  }
  const newMovieInput = {
    title: titleMovievalue,
    imgurl: imageUrlMovievalue,
    rating: ratingMovievalue,
  };
  movieList.push(newMovieInput);
  clearMovieInputEntries();
  toggleMovieHandler();
  updateEntrySection();
  renderNewMovieElement(
    newMovieInput.title,
    newMovieInput.imgurl,
    newMovieInput.rating
  );
  console.log(movieList);
};

const cancelAddMovieHandler = () => {
  toggleMovieHandler();
  clearMovieInputEntries();
};
const backdropHandler = () => {
  toggleMovieHandler();
};

toggleMovieBtn.addEventListener("click", toggleMovieHandler);
backdropEl.addEventListener("click", backdropHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);
storeAddMovieBtn.addEventListener("click", storeAddMovieHandler);
