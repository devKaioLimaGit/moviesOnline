const sectionMovies = document.querySelector(".filmes");
const search = document.querySelector(".pesquisa");
const navBarCategori = document.querySelector(".nav-bar-categories");

let movies;

async function fetchmovie() {
  try {
    const response = await fetch("assets/json/movies.json");
    if (response.ok) {
      console.log("Requisição feita com sucesso!");
      movies = await response.json();
      createButtonCategories();
      movies.forEach((movie) =>
        createCards(
          movie.img,
          movie.nome,
          movie.sinopse,
          movie.trailer,
          movie.link,
          movie.recommendation,
          movie.categories
        )
      );
    } else {
      console.log("Requisição mal sucedida! Status: " + response.status);
    }
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
  }
}

search.addEventListener("input", (e) => {
  const filter = e.target.value.toLowerCase();
  sectionMovies.innerHTML = "";

  if (filter === "") {
    navBarCategori.style.display = "block";
    movies.forEach((movie) =>
      createCards(
        movie.img,
        movie.nome,
        movie.sinopse,
        movie.trailer,
        movie.link,
        movie.recommendation,
        movie.categories
      )
    );
  } else {
    navBarCategori.style.display = "none";
    movies
      .filter((movie) => movie.nome.toLowerCase().includes(filter))
      .forEach((movie) => {
        createCards(
          movie.img,
          movie.nome,
          movie.sinopse,
          movie.trailer,
          movie.link,
          movie.recommendation,
          movie.categories
        );
      });
  }
});

function createButtonCategories() {
  const genres = [
    "Ação",
    "Aventura",
    "Terror",
    "Comédia",
    "Animação",
    "Fantasía",
    "Anime",
    "Suspense",
    "Drama",
  ];
  navBarCategori.innerHTML = "";
  genres.forEach((genre) => {
    const createButton = document.createElement("button");
    createButton.classList.add("button-categorie");
    createButton.innerText = genre;
    navBarCategori.appendChild(createButton);
  });

  const buttonCategories = document.querySelectorAll(".button-categorie");

  buttonCategories.forEach((button) => {
    button.addEventListener("click", (e) => {
      const genre = e.target.innerText;
      const filmesFilterCategories = movies.filter((movie) =>
        movie.categories.includes(genre)
      );
      sectionMovies.innerHTML = "";
      filmesFilterCategories.forEach((movie) =>
        createCards(
          movie.img,
          movie.nome,
          movie.sinopse,
          movie.trailer,
          movie.link,
          movie.recommendation,
          movie.categories
        )
      );
    });
  });
}

function createCards(
  img,
  nome,
  sinopse,
  trailer,
  link,
  recommendation,
  categories
) {
  const div = document.createElement("div");
  div.classList.add("card-filme");

  div.innerHTML = `
        <div class="img-card">
            <img src="${img}" alt="">
        </div>
        <div class="description">
            <h2 class="name-filme">
                <img class="recomendation" src="${recommendation}" alt="" width="50px" height="50px">
                ${nome}
                <button class="button-genre">${categories}</button>
            </h2>
            <h3 class="sub-text">Sinopse:</h3>
            <p class="sinopse">${sinopse}</p>
            <h3 class="sub-text">Trailer:</h3>
            <iframe width="100%" height="315px" src="${trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <button class="button-watch">Assistir</button>
        </div>
    `;

  sectionMovies.appendChild(div);

  div.querySelector(".button-watch").addEventListener("click", (e) => {
    const allButtons = Array.from(document.querySelectorAll(".button-watch"));
    const index = allButtons.indexOf(e.target);
    carregaModel(nome, link);
  });
}

function carregaModel(nome, link) {
  const div = document.createElement("div");
  div.classList.add("model-filme");
  sectionMovies.innerHTML = "";
  div.innerHTML = `
    <h1>${nome}</h1>
  <video src="${link}" controls></video>
  <br/>
    <br/>
   <a href="/" class="button-voltar">Volta Para Menu</a>
  `;

  sectionMovies.appendChild(div);
}
fetchmovie();
