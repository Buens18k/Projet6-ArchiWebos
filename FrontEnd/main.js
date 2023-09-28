//  fonction de récupération des données API works
async function fetchWorks() {
  // Récupération des données de l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  //  retourne en json
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

// function de récupération des données de l'API catégory
async function fetchCategory() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();

  // test de fonctionnement
  // console.log(category);
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

// fonction qui filtre par catégories
function categoryFilter(works) {
  const categoriesTous = works;
  // console.log("Tous", categoriesTous);

  const categories1 = works.filter((work) => {
    return work.categoryId === 1;
  });
  // console.log("Nombre de catégories 1 :", categories1);

  const categories2 = works.filter((work) => {
    return work.categoryId === 2;
  });
  // console.log("Nombre de Catégories 2 filtrer =",categories2);

  const categories3 = works.filter((work) => {
    return work.categoryId === 3;
  });
  // console.log("Nombre de Catégories 3 filtrer =",categories3);

  // stock toutes les catégories filtrer dans une variable et la retourne
  const allCategoriesFiltrer = [
    categoriesTous,
    categories1,
    categories2,
    categories3,
  ];
  return allCategoriesFiltrer;
}

// function de création de bouton
function createButtonFilter(categoryFetch, allCategoriesFilter) {
  // Récupération de la div filter
  const filterDiv = document.querySelector(".filter");
  // console.log(allCategoriesFilter)

  const buttonTous = document.createElement("button");
  buttonTous.textContent = `Tous`;
  buttonTous.classList.add("btn");
  filterDiv.appendChild(buttonTous);
  addventListenerButtonFilter(buttonTous)

  // création élément button pour chaques catégories
  categoryFetch.forEach((category) => {
    // création du bouton
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = category.name;
    filterDiv.appendChild(button);
    addventListenerButtonFilter(button);
    // console.log(category)
  });
}

// function event listener sur btnFilter
function addventListenerButtonFilter(element) {
  element.addEventListener("click", (event) => {
    // test de fonctionnement
    // removeStyleBtnSelectedFilter(element);
    // addStyleBtnSelectedFilter(element);
    console.log("j'écoute le ", element);
  });
}

// function qui assigne le style au bouton selectionner
function addStyleBtnSelectedFilter(element) {
  // element.addEventListener("click", (event) => {
  element.classList.add("btn-selected");
}

// function qui enlève le style au bouton selectionner
function removeStyleBtnSelectedFilter(element) {
  const buttonfilter = document.querySelectorAll(".btn");
  buttonfilter.forEach((element) => {
    element.classList.remove("btn-selected");
    console.log(element);
  });
}

// fonction d'initialisation
async function init() {
  // récupère les données API works
  const worksFetch = await fetchWorks();
  // récupère les données API categories
  const categoryFetch = await fetchCategory();
  // Test de fonctionnement
  // console.log(works, category);

  // **********appelle des fonctions

  // créer l'élément figure
  createFigure(worksFetch);

  // filtre les catégories
  categoryFilter(worksFetch);

  // stock les catégories filtrer dans une variables réutilisable
  const allCategoriesFilter = categoryFilter(worksFetch);
  // Test de fonctionnement
  // console.log(allCategoriesFilter);

  createButtonFilter(categoryFetch, allCategoriesFilter);
}

// appel de la fonction d'initialisation
init();
