// --------------contact-----------
const contactElements = document.querySelectorAll(".contact");

contactElements.forEach(function (contact) {
  contact.addEventListener("click", function () {
    alert("azad.mirzazada95@gmail.com");
  });
});

// ------------downloadhere----------
const downloadButtons = document.querySelector(".downloadHere");

downloadButtons.addEventListener("click", function () {
  alert("Your internet is weak");
});

// --------------------Types---------------
const dropBtn = document.querySelector(".dropdown");

dropBtn.addEventListener("click", function () {
  const dropdownContent = document.querySelector(".dropdown-content");
  if (
    dropdownContent.style.display === "none" ||
    dropdownContent.style.display === ""
  ) {
    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
});

function addClickListener(elementSelector, genre) {
  const element = document.querySelector(elementSelector);

  element.addEventListener("click", async function () {
    try {
      const response = await fetch(
        `http://localhost:3000/movies?Genre=${genre}`
      );
      const responseBody = await response.json();
      updateDom(responseBody);
    } catch (error) {
      console.error(error);
    }
  });
}

addClickListener(".actItem", "Action");
addClickListener(".docItem", "Documentary");
addClickListener(".sciItem", "Science Fiction");
addClickListener(".draItem", "Drama");
addClickListener(".fanItem", "Fantastic");
addClickListener(".ThrItem", "Thrillers");
addClickListener(".horItem", "Horror");

// ------------------up movie robot---------------
const rightDeleteButtons = document.querySelector(".rightDeleteButtons");

rightDeleteButtons.addEventListener("click", function () {
  const selectElements = document.querySelectorAll("select");
  selectElements.forEach(function (selectElement) {
    selectElement.selectedIndex = 0;
  });
});
// ------------------rightside movie robot---------------
const rightDeleteButtons1 = document.querySelector("#rightDeleteButton");

rightDeleteButtons1.addEventListener("click", function () {
  const selectElements = document.querySelectorAll("select");
  selectElements.forEach(function (selectElement) {
    selectElement.selectedIndex = 0;
  });
});
// --------------------------pagination--------------
const moviesList = document.querySelector(".forJsDiv");

function updateDom(movies) {
  if (moviesList) {
    let resultHTML = "";
    movies.forEach(function (movieJs) {
      resultHTML += `
      <div class="Movie">
        <img src="${movieJs.ImageLink}" alt="${movieJs.Name}"/>
        <h4 class="titleTag">${movieJs.Name}</h4>
        <a href="moreButton.html?id=${movieJs.id}" target="_blank"><button class="moreButton">More</button></a>
      </div>
      `;
    });
    moviesList.innerHTML = resultHTML;
  }
  setActivePages();
}

let currentPage = 1;
let totalPages = 1;

async function fetchCards(page) {
  try {
    const response = await fetch(
      `http://localhost:3000/movies?_page=${page}&_limit=6`
    );
    const responseBody = await response.json();
    totalPages = Math.ceil(response.headers.get("X-Total-Count") / 6);
    currentPage = page;
    paginationButtons(totalPages);
    updateDom(responseBody);
  } catch (error) {
    console.log(error);
  }
}
fetchCards(currentPage);

function setActivePages() {
  const pageElements = document.querySelectorAll(".pageLi");
  if (pageElements.length) {
    pageElements.forEach(function (pageElement, index) {
      if (index + 1 === currentPage) {
        pageElement.classList.add("active");
      } else {
        pageElement.classList.remove("active");
      }
    });
  }
}

document.getElementById("previousPage").addEventListener("click", function () {
  if (currentPage > 1) {
    fetchCards(currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  if (currentPage < totalPages) {
    fetchCards(currentPage + 1);
  }
});

function paginationButtons(totalPages) {
  const paginationNumbers = document.querySelector(".paginationNumbers");
  paginationNumbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const liElemets = document.createElement("li");
    liElemets.classList.add("pageLi");
    liElemets.textContent = i; //sehifelerin reqemlerini sehifede yazir
    liElemets.addEventListener("click", function () {
      fetchCards(i);
    });
    paginationNumbers.appendChild(liElemets);
  }
}

// ---------------------search---------------------

const searchButton = document.querySelector(".fa-magnifying-glass");

searchButton.addEventListener("click", async function fetchAndFilterMovies() {
  try {
    const searchInput = document.querySelector("#searchInput").value;
    const paginationContainer = document.querySelector(".paginationContainer");
    if (
      searchInput ||
      paginationContainer.classList.contains(".paginationContainer")
    ) {
      const response = await fetch(
        `http://localhost:3000/movies?q=${searchInput}`
      );
      const responseBody = await response.json();
      updateDom(responseBody);
      paginationContainer.style.display = "none";
    } else {
      fetchCards();
      paginationContainer.style.display = "flex";
    }
    document.querySelector("#searchInput").value = "";
  } catch (error) {
    console.log(error);
  }
});
// ------------------------------

// -----------------the best----------------
const theBestButton = document.querySelector(".theBestButton");

theBestButton.addEventListener("click", async function () {
  try {
    const forJsDiv = document.querySelector(".forJsDiv");
    const response = await fetch("http://localhost:3000/theBest");
    const bestMovies = await response.json();
    if (bestMovies.length > 0) {
      forJsDiv.innerHTML = "";
      updateDom(bestMovies);
    }
  } catch (error) {
    console.log(error);
  }
});

// --------------------filter up and right movie robot---------------
const movieRobotContainer = document.querySelector("#movieRobot");

movieRobotContainer.addEventListener("click", function () {
  const ulElement = document.querySelector("#ulMovieRobot1");
  if (ulElement.style.display === "none" || ulElement.style.display === "") {
    ulElement.style.display = "block";
  } else {
    ulElement.style.display = "none";
  }
});

async function bringFunction() {
  const movieGenre = document.querySelector("#movieGenre").value;
  const movieGenre1 = document.querySelector("#movieGenre1").value;
  const years = document.querySelector("#yearsContainer1").value;
  const years1 = document.querySelector("#years1").value;
  const imdb = document.querySelector("#imdb").value;
  const imdb1 = document.querySelector("#imdb1").value;
  const movieQuality = document.querySelector("#movieQuality").value;
  const movieQuality1 = document.querySelector("#movieQuality1").value;

  const forJsDiv = document.querySelector(".forJsDiv");

  if (forJsDiv) {
    filtered(
      movieGenre,
      years,
      imdb,
      movieQuality,
      movieGenre1,
      years1,
      imdb1,
      movieQuality1
    );
  }
}

async function filtered(
  movieGenre,
  years,
  imdb,
  movieQuality,
  movieGenre1,
  years1,
  imdb1,
  movieQuality1
) {
  try {
    const isMovieGenre = movieGenre ? `Genre=${movieGenre}&` : "";
    const isMovieGenre1 = movieGenre1 ? `Genre=${movieGenre1}&` : "";
    const isMovieYears = years ? `Years=${years}&` : "";
    const isMovieYears1 = years1 ? `Years=${years1}&` : "";
    const isMovieIMDB = imdb ? `IMDB=${imdb}&` : "";
    const isMovieIMDB1 = imdb1 ? `IMDB=${imdb1}&` : "";
    const isMovieQuality = movieQuality ? `Quality=${movieQuality}&` : "";
    const isMovieQuality1 = movieQuality1 ? `Quality=${movieQuality1}` : "";

    const responseGenre = await fetch(
      `http://localhost:3000/movies?${isMovieGenre}${isMovieGenre1}${isMovieYears}${isMovieYears1}${isMovieIMDB}${isMovieIMDB1}${isMovieQuality}${isMovieQuality1}`
    );
    const responseBodyGenre = await responseGenre.json();
    updateDom(responseBodyGenre);
    return responseBodyGenre;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------4K HD IMDB----------------
const fourKButton = document.querySelector(".fourKButton");

fourKButton.addEventListener("click", async function fourKFunction() {
  try {
    const response = await fetch("http://localhost:3000/movies?Quality=4K");
    const bestMovies = await response.json();
    updateDom(bestMovies);
  } catch (error) {
    console.log(error);
  }
});

// --------------------------HD------------------
const HDButton = document.querySelector(".HDButton");

HDButton.addEventListener("click", async function HDButtonFunction() {
  try {
    const response = await fetch("http://localhost:3000/movies?Quality=HD");
    const bestMovies = await response.json();
    updateDom(bestMovies);
  } catch (error) {
    console.log(error);
  }
});
// ------------------IMDB-------------------
const NewButton = document.querySelector(".NewButton");
NewButton.addEventListener("click", async function NewButtonFunction() {
  try {
    const response = await fetch("http://localhost:3000/movies?Years=2023");
    const bestMovies = await response.json();
    updateDom(bestMovies);
  } catch (error) {
    console.log(error);
  }
});

// --------------------pictures-----------------
const ulPicturesContainer = document.querySelector(".ulPicturesContainer");

function ulPicturesContainerFunction(pictures) {
  if (ulPicturesContainer) {
    let resultHTML = "";
    pictures.forEach(function (picture) {
      resultHTML += `
        <li>
          <a href=${picture.VideoLink} target="_blank">
            <img src=${picture.ImageLink} alt=${picture.Name} />
          </a>
        </li>
      `;
    });
    ulPicturesContainer.innerHTML = resultHTML;
  }
}

async function getPicturesFunction() {
  try {
    const response = await fetch("http://localhost:3000/movies");
    const responseBody = await response.json();
    ulPicturesContainerFunction(responseBody);
  } catch (error) {
    console.log(error);
  }
}

getPicturesFunction();
