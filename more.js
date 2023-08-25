// ----------------when click moreButton, go to downloadButtons.json-------------

async function morePage() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const moveId = urlParams.get("id");

    const response = await fetch(`http://localhost:3000/movies/${moveId}`);
    const movieData = await response.json();

    const forJsElement = document.querySelector("main");
    forJsElement.innerHTML = `
    <div class="middleElement">
      <div class="middle">
        <h1 class="nameOfMovies namesFilms">${movieData.Name}</h1>
      </div>
    </div>
    <section>
      <div class="namesnavbar">
        <h2 class="namesFilms">${movieData.Name}</h2>
        <a href="${movieData.VideoLink}" target="_blank">
          <button class="watchMovie fa-beat">Watch Movie</button>
        </a>
        <div class="twoButtons">
          <button class="ImdbButton">IMDB <span>${movieData.IMDB}</span></button>
          <button class="qualityButton">${movieData.Quality}</button>
        </div>
      </div>
      <div class="imageAndTextContainer">
        <div class="onlyImage">
          <img
            src=${movieData.ImageLink}
            alt=${movieData.Name}
          />
          <div class="theBestContainer">
            <button class="theBestButton">The Best</button>
          </div>
        </div>
        <div class="moreInformation">
          <p class="about">${movieData.About}</p>
          <p class="genre">Genre: ${movieData.Genre}</p>
          <p class="years">Years: ${movieData.Years}</p>
          <div class="deleteEditButtons">
            <button class="deleteButton">Delete</button>
            <div class="saveContainer">
              <textarea
                class="saveTextarea"
                name="addText"
                id="addTextLg"
                cols="30"
                rows="10"
              >${movieData.About}</textarea>
              <button class="saveButton">Save</button>
            </div>
            <button class="edit">Edit</button>
          </div>
          <div class="inputElement">
            <input type="text" name="addTextSml" id="addTextSml" value=${movieData.About} />
            <button class="saveButton">Save</button>
          </div>
        </div>
      </div>
    </section>
        `;

    // ------------------delete-button--------------

    const deleteButton = document.querySelector(".deleteButton");
    const page = document.querySelector(".page");

    deleteButton.addEventListener("click", async function () {
      try {
        const areYouSure = confirm("Are You Sure?");
        if (areYouSure) {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const moveId = urlParams.get("id");
          const response = await fetch(
            `http://localhost:3000/movies/${moveId}`,
            {
              method: "DELETE",
            }
          );
          if (areYouSure) {
            if (response.ok) {
              window.close();
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    // ------------------edit-button--------------
    const editButton = document.querySelector(".edit");
    const saveButton = document.querySelector(".saveButton");
    const saveTextarea = document.querySelector(".saveTextarea");

    editButton.addEventListener("click", function () {
      const saveCon = document.querySelector(".saveContainer");
      const inputTag = document.querySelector(".inputElement");

      if (window.innerWidth > 1001) {
        if (saveCon.style.display === "none" || saveCon.style.display === "") {
          saveCon.style.display = "flex";
        } else {
          saveCon.style.display = "none";
        }
      }
      if (window.innerWidth < 1001) {
        if (
          inputTag.style.display === "none" ||
          inputTag.style.display === ""
        ) {
          inputTag.style.display = "flex";
        } else {
          inputTag.style.display = "none";
        }
      }
    });
    saveButton.addEventListener("click", saveFetchFunction);

    async function saveFetchFunction() {
      try {
        const saveTextareaValue = saveTextarea.value;
        if (saveTextareaValue) {
          const response = await fetch(
            `http://localhost:3000/movies/${moveId}`,
            {
              method: "PUT",
              body: JSON.stringify({
                Name: movieData.Name,
                ImageLink: movieData.ImageLink,
                VideoLink: movieData.VideoLink,
                Genre: movieData.Genre,
                Years: movieData.Years,
                IMDB: movieData.Imdb,
                Quality: movieData.Quality,
                About: saveTextareaValue,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const responseBody = await response.json();
          console.log(responseBody);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // ------------------theBest-button--------------

    const theBestButton = document.querySelector(".theBestButton");

    theBestButton.addEventListener("click", async function () {
      try {
        const res = await fetch("http://localhost:3000/theBest");
        const bestMoviess = await res.json();
        if (!bestMoviess.find((item) => item.Name === movieData.Name)) {
          const response = await fetch("http://localhost:3000/theBest", {
            method: "POST",
            body: JSON.stringify({
              ImageLink: movieData.ImageLink,
              Name: movieData.Name,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const movie = await response.json();

          return movie;
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", morePage);
