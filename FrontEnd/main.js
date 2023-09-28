//  fonction de récupération des données API works
async function fetchWorks() {
  // Récupération des données de l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  //  retourne en json
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

function createFigure(works) {
  // Récupère la div gallery
  const galleryDiv = document.querySelector(".gallery");
  // parcours la liste works en stokant tout le contenu réaliser (dans la boucle) dans la variable temporaire work
  works.forEach((work) => {
    // création de l'élément figure
    const worksFigure = document.createElement("figure");
    // rajoute l'élément créer dans le html avec :
    // son élément img et figcaption
    // en utilisant les données "work" et récupérerant les propriétés "imageUrl, title"
    worksFigure.innerHTML = `
      <img src ="${work.imageUrl}" alt="${work.title}">
	    <figcaption>${work.title}</figcaption>
    `;
    // manipulation du DOM precisant "worksFigure" enfant de "galleryDiv"
    galleryDiv.appendChild(worksFigure);
    // test de fonctionnement
    // console.log(work);
  });
}

// function de récupération des données de l'API catégory
async function fetchCategory() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();

  // test de fonctionnement
  // console.log(category);
}

// function de création de bouton
function createButtonFilter(category) {
  // Récupération de la div filter
  const filterDiv = document.querySelector(".filter");
  // console.log(filterDiv)
  category.forEach((btnCategory) => {
    const btnFilter = document.createElement("button");
    btnFilter.classList.add("btn");
    btnFilter.innerHTML = `${btnCategory.name}`;
    filterDiv.appendChild(btnFilter);

    console.log(btnCategory);
  });

  // console.log(btnCategory);
  // const btnFilter = document.createElement("button");
  // btnFilter.classList.add("btn");
  // btnFilter.innerText = "Tous";

  // btnFilter.addEventListener("click", (event) => {
  //   removeStyleBtnSelectedFilter(btnFilter);
  //   addStyleBtnSelectedFilter(btnFilter);
  // });
}

// function qui assigne le style au bouton selectionner
function addStyleBtnSelectedFilter(element) {
  // element.addEventListener("click", (event) => {
  element.classList.add("btn-selected");
}
// );
// }
// function qui enlève le style au bouton selectionner
function removeStyleBtnSelectedFilter(element) {
  element.classList.remove("btn-selected");
}

// fonction d'initialisation
async function init() {
  // récupère les données API stockées works
  const works = await fetchWorks();
  // Test de fonctionnement
  //   console.log(works);

  // récupère les données API stockées works
  const category = await fetchCategory();
  // Test de fonctionnement
  console.log(category);

  // appelle de la fonction qui créer l'élément figure
  createFigure(works);
  createButtonFilter(category);
}

// appel de la fonction d'initialisation
init();
