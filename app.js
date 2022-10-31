const heroName = document.querySelector(".name");
const superHeroDetails = document.querySelector(".super-hero-details");
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
      superheroDetails(json);
    });
};

// randomly generate superhero function
const randomSuperHero = () => {
  const totalSuperHero = 731;
  return Math.floor(Math.random() * totalSuperHero + 1);
};

// search for superhero
const searchSuperHero = () => {
  const inputValue = document.querySelector("#input-value").value;
  fetch(`${superHeroAPI}/search/${inputValue}`)
    .then((response) => response.json())
    .then((json) => {
      const theHero = json.results[0];

      superheroDetails(theHero);
    });
};

// superhero full details and appending it to the dom
const superheroDetails = (superhero) => {
  let superheroName = superhero.name;
  let searchSuperHeroImgUrl = superhero.image.url;
  
let imageHTML = `<img id ="superhero-image" src=${searchSuperHeroImgUrl}>`;
 let heroNameHTML = `<h2 class="name">${superheroName.toUpperCase()}</h2>`;
  

  let stats = Object.keys(superhero.powerstats)
      .map((ability) => {
        
      return `<p>${ability.toUpperCase()} : ${superhero.powerstats[ability]}</p>`;
    })
    .join(" ");

  superHeroDetails.innerHTML = `${imageHTML} ${heroNameHTML} ${stats}`
};

loadAllEventListeners();
