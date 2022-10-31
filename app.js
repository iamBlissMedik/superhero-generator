const heroName = document.querySelector(".name");

const randomGen = document.querySelector("#random-gen");
const superHeroImage = document.querySelector("#superhero-image");
const search = document.querySelector("#search");
const superHeroAPI = "https://www.superheroapi.com/api.php/5742301652531542";
const loadAllEventListeners = () => {
    randomGen.addEventListener("click", getSuperHero);
    search.addEventListener("click", searchSuperHero);
};

// auto generate button
const getSuperHero = () => {
  fetch(`${superHeroAPI}/${randomSuperHero()}`)
    .then((response) => response.json())
    .then((json) => {
      heroName.textContent = `${json.name}`;
      superHeroImage.src = `${json.image.url}`;
    });
};

// randomly generate superhero function
const randomSuperHero = () => {
  const totalSuperHero = 732;
  return Math.floor(Math.random() * totalSuperHero + 1);
};

// search for superhero
const searchSuperHero = () => {
const inputValue = document.querySelector("#input-value").value;
  fetch(`${superHeroAPI}/search/${inputValue}`)
    .then((response) => response.json())
      .then((json) => {
          superHeroImage.src = `${json.results[0].image.url}`;
          heroName.textContent = `${json.results[0].name}`;
      
    });
};

loadAllEventListeners();
