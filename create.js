const createButton = document.querySelector(".createButton");
const deleteButton = document.querySelector(".deleteButton");
// -----------------delete----------------
deleteButton.addEventListener("click", function () {
  const deleteInput = document.querySelectorAll("input[type='text']");
  const deleteSelect = document.querySelectorAll("select");
  const deleteTextarea = document.querySelector("textarea");

  deleteInput.forEach(function (input) {
    input.value = "";
  });

  deleteSelect.forEach(function (select) {
    select.selectedIndex = 0;
  });

  deleteTextarea.value = "";
});
// -----------------create-------------
createButton.addEventListener("click", async function () {
  const nameOfTheMovie = document.getElementById("nameOfTheMovie").value;
  const imageLinkOfTheMovie = document.getElementById(
    "imageLinkOfTheMovie"
  ).value;
  const videoLinkOfTheMovie = document.getElementById(
    "videoLinkOfTheMovie"
  ).value;
  const movieGenre = document.getElementById("movieGenre").value;
  const years = document.getElementById("years").value;
  const imdb = document.getElementById("imdb").value;
  const movieQuality = document.getElementById("movieQuality").value;
  const aboutTheMovie = document.getElementById("aboutTheMovie").value;

  if (
    nameOfTheMovie &&
    imageLinkOfTheMovie &&
    videoLinkOfTheMovie &&
    movieGenre &&
    years &&
    imdb &&
    movieQuality &&
    aboutTheMovie
  ) {
    await fetchPost(
      nameOfTheMovie,
      imageLinkOfTheMovie,
      videoLinkOfTheMovie,
      movieGenre,
      years,
      imdb,
      movieQuality,
      aboutTheMovie
    );
    window.location.href = "movies.html";
  } else {
    alert("Please Enter Information");
  }
});

async function fetchPost(
  name,
  imageLink,
  videoLink,
  genre,
  years,
  imdb,
  quality,
  about
) {
  try {
    const response = await fetch("http://localhost:3000/movies", {
      method: "POST",
      body: JSON.stringify({
        Name: name,
        ImageLink: imageLink,
        VideoLink: videoLink,
        Genre: genre,
        Years: years,
        IMDB: imdb,
        Quality: quality,
        About: about,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
}
