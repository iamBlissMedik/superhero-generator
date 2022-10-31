const heroName = document.querySelector(".name");
const inputValue = document.querySelector("#input-value");
const randomGen = document.querySelector("#random-gen");
const superHeroAPI = "https://www.superheroapi.com/api.php/5742301652531542";
const loadAllEventListeners = () => {
  randomGen.addEventListener("click", getSuperHero);
};

// generate button
const getSuperHero = () => {
  fetch(`${superHeroAPI}/${randomSuperHero()}`)
    .then((response) => response.json())
    .then((json) => {
      heroName.textContent = `${json.name}`;
    });
};

// randomly generate superhero
const randomSuperHero = () => {
  const totalSuperHero = 732;
  return Math.floor(Math.random() * totalSuperHero + 1);
};

loadAllEventListeners();
