// --------------contact-----------
const contactElements = document.querySelectorAll(".contact");

contactElements.forEach(function (contact) {
  contact.addEventListener("click", function () {
    alert("azad.mirzazada95@gmail.com");
  });
});

//-------------movie robot-----------
const movieRobotContainer = document.querySelector("#movieRobot");

movieRobotContainer.addEventListener("click", function () {
  const ulElement = document.querySelector("#ulMovieRobot1");
  if (ulElement.style.display === "none" || ulElement.style.display === "") {
    ulElement.style.display = "block";
  } else {
    ulElement.style.display = "none";
  }
});

//--------------movie robot search----------
const bringButton = document.querySelector(".bringTheMovies");

// ------------downloadhere----------
const downloadButtons = document.querySelector(".downloadHere");

downloadButtons.addEventListener("click", function () {
  alert("Your internet is weak");
});

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
    const paginationContainer = document.querySelector(".paginationContainer");
    const filterContainer = document.querySelector(".filterContainer");

    if (forJsDiv && paginationContainer) {
      forJsDiv.remove();
      paginationContainer.remove();
    }

    const response = await fetch("http://localhost:3000/theBest");
    const bestMovies = await response.json();
    console.log(bestMovies);
    if (bestMovies.length > 0) {
      filterContainer.innerHTML = "";
      theBest(bestMovies);
    }
  } catch (error) {
    console.log(error);
  }
});

function theBest(best) {
  const filterContainer = document.querySelector(".filterContainer");

  if (filterContainer) {
    let resultHTML = "";
    best.forEach(function (movieJs) {
      resultHTML += `
        <div class="Movie">
          <img src="${movieJs.ImageLink}" alt="${movieJs.Name}"/>
          <h4 class="titleTag">${movieJs.Name}</h4>
          <a href="moreButton.html?id=${movieJs.id}" target="_blank"><button class="moreButton">More</button></a>
        </div>
      `;
    });
    filterContainer.innerHTML = resultHTML;
  }
}

// --------------------filter movie robot---------------

async function bringFunction() {
  const movieGenre = document.querySelector("#movieGenre").value;
  const years = document.querySelector("#yearsContainer1").value;
  const imdb = document.querySelector("#imdb").value;
  const movieQuality = document.querySelector("#movieQuality").value;

  const forJsDiv = document.querySelector(".forJsDiv");
  const paginationContainer = document.querySelector(".paginationContainer");

  if (forJsDiv && paginationContainer) {
    forJsDiv.remove();
    paginationContainer.remove();
  }
  filtered(movieGenre, years, imdb, movieQuality);
}

async function filtered(movieGenre, years, imdb, movieQuality) {
  try {
    const isMovieGenre = movieGenre ? `Genre=${movieGenre}&` : "";
    const isMovieYears = years ? `Years=${years}&` : "";
    const isMovieIMDB = imdb ? `IMDB=${imdb}&` : "";
    const isMovieQuality = movieQuality ? `Quality=${movieQuality}` : "";

    const responseGenre = await fetch(
      `http://localhost:3000/movies?${isMovieGenre}${isMovieYears}${isMovieIMDB}${isMovieQuality}`
    );
    const responseBodyGenre = await responseGenre.json();
    filterFunction(responseBodyGenre);
    return responseBodyGenre;
  } catch (error) {
    console.log(error);
  }
}

function filterFunction(movies) {
  if (filterContainer) {
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
    filterContainer.innerHTML = resultHTML;
  }
}

// ----------------------4K HD IMDB----------------
const fourKButton = document.querySelector(".fourKButton");

fourKButton.addEventListener("click", async function fourKFunction() {
  try {
    const forJsDiv = document.querySelector(".forJsDiv");
    const paginationContainer = document.querySelector(".paginationContainer");

    if (forJsDiv && paginationContainer) {
      forJsDiv.remove();
      paginationContainer.remove();
    }

    const response = await fetch("http://localhost:3000/movies?Quality=4K");
    const bestMovies = await response.json();
    console.log(bestMovies);
    updateFilterNewQualityFunction(bestMovies);
  } catch (error) {
    console.log(error);
  }
});
const filterContainer = document.querySelector(".filterContainer");

function updateFilterNewQualityFunction(Quality) {
  if (filterContainer) {
    let resultHTML = "";
    Quality.forEach(function (movieJs) {
      resultHTML += `
      <div class="Movie">
        <img src="${movieJs.ImageLink}" alt="${movieJs.Name}"/>
        <h4 class="titleTag">${movieJs.Name}</h4>
        <a href="moreButton.html?id=${movieJs.id}" target="_blank"><button class="moreButton">More</button></a>
      </div>
      `;
    });
    filterContainer.innerHTML = resultHTML;
  }
}
// --------------------------HD------------------
const HDButton = document.querySelector(".HDButton");

HDButton.addEventListener("click", async function HDButtonFunction() {
  try {
    const forJsDiv = document.querySelector(".forJsDiv");
    const paginationContainer = document.querySelector(".paginationContainer");

    if (forJsDiv && paginationContainer) {
      forJsDiv.remove();
      paginationContainer.remove();
    }

    const response = await fetch("http://localhost:3000/movies?Quality=HD");
    const bestMovies = await response.json();
    console.log(bestMovies);
    updateFilterNewQualityFunction(bestMovies);
  } catch (error) {
    console.log(error);
  }
});
// ------------------IMDB-------------------
const NewButton = document.querySelector(".NewButton");
NewButton.addEventListener("click", async function NewButtonFunction() {
  try {
    const forJsDiv = document.querySelector(".forJsDiv");
    const paginationContainer = document.querySelector(".paginationContainer");

    if (forJsDiv && paginationContainer) {
      forJsDiv.remove();
      paginationContainer.remove();
    }

    const response = await fetch("http://localhost:3000/movies?Years=2023");
    const bestMovies = await response.json();
    updateFilterNewQualityFunction(bestMovies);
  } catch (error) {
    console.log(error);
  }
});
