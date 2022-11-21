const heroName = document.querySelector(".name");
const superHeroDetails = document.querySelector(".super-hero-details");
const randomGen = document.querySelector("#random-gen");
const superHeroImage = document.querySelector("#superhero-image");
const search = document.querySelector("#search");
const superHeroAPI = "https://www.superheroapi.com/api.php/5742301652531542";
const errorText = document.querySelector(".error");
const loadAllEventListeners = () => {
  randomGen.addEventListener("click", getSuperHero);
  search.addEventListener("click", searchSuperHero);
};

// error
const renderError = (msg) => {
  errorText.style.display = "block";
  errorText.textContent = msg
}



// search for superhero
const searchSuperHero = async () => {
  try {
     let inputValue = document.querySelector("#input-value").value;
  
  const search = await fetch(`${superHeroAPI}/search/${inputValue}`)
    const searchData = await search.json();
    console.error(searchData)
    if (searchData.error === "bad name search request") {
       
        throw new Error("Not Found");
      }
      if (searchData.error === "character with given name not found") {
        throw new Error(`"${inputValue}" Not Found`);
      }
      const theHero = searchData.results[0];
      errorText.style.display = "none";

      superheroDetails(theHero);
   
  }
  catch (err) {
    let html = "Something went wrong:";
    return renderError(`${html}  ${err.message.toUpperCase()}`);
  }
 
};

// auto generate button
const getSuperHero = () => {
  fetch(`${superHeroAPI}/${randomSuperHero()}`)
    .then((response) =>
    {
      console.log(response.ok);
      return response.json()})
    .then((json) => {
      
      superheroDetails(json);
      
      errorText.style.display = "none";
      
    })
    .catch((err) =>
    {
     
      let html
        = "Something went wrong: Check your internet connection"
     return renderError(`${html} `)
    });
   
  
};

// randomly generate superhero function
const randomSuperHero = () => {
  const totalSuperHero = 731;
  return Math.floor(Math.random() * totalSuperHero + 1);
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
