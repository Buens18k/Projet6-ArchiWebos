// Variable globale récupérant les travaux de l'API works
let worksFetch;

// fonction asynchone pour récupérer les données de l'API works
async function fetchWorks() {
  // Requête pour récupérer les données de l'API works
  const reponse = await fetch("http://localhost:5678/api/works");
  // Convertit la réponse en JSON
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

// fonction asynchone pour récupérer les données de l'API catégories
async function fetchCategory() {
  // Requête pour récupérer les données de l'API catégories
  const reponse = await fetch("http://localhost:5678/api/categories");
  // Convertit la réponse en JSON
  return await reponse.json();

  // test de fonctionnement
  // console.log(category);
}

// fonction qui créer les éléments HTML pour chaque figure et les affiches dans la gallery
function createFigure(works) {
  // parcours la liste des données de l'API works
  works.forEach((work) => {
    // appel de la fonction qui crée une figure pour chaque objets dans les données de l'API works
    createWork(work);
  });
}

// function qui crée un élément "figure" dans la Div "gallery"
function createWork(work) {
  // Récupère la div gallery
  const galleryDiv = document.querySelector(".gallery");
  // création de l'élément figure
  const workFigure = document.createElement("figure");
  // remplit l'élément figure avec les propriétés "imageUrl, title" de l'API
  workFigure.innerHTML = `
        <img src ="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
      `;
  // ajoute l'élément "figure" à la div "gallery"
  galleryDiv.appendChild(workFigure);
  // test de fonctionnement
  // console.log(work);
}

// fonction pour filtrer les données de l'API works par catégories
function categoryFilter(works, categoryId) {
  // stock toutes les catégories dans la variable "categoriesTous"
  const categoriesTous = works;
  // console.log("Tous", categoriesTous);

  // stock toutes les catégorie dans la variable "categories1"
  const categories1 = works.filter((work) => {
    return work.categoryId === 1;
  });
  // console.log("Nombre de catégories 1 :", categories1);

  // stock toutes les catégorie dans la variable "categories2"
  const categories2 = works.filter((work) => {
    return work.categoryId === 2;
  });
  // console.log("Nombre de Catégories 2 filtrer =",categories2);

  // stock toutes les catégorie dans la variable "categories3"
  const categories3 = works.filter((work) => {
    return work.categoryId === 3;
  });
  // console.log("Nombre de Catégories 3 filtrer =",categories3);

  // retourne les éléments ayant le même ID de catégorie que celui spécifié
  return works.filter((work) => work.categoryId === categoryId);
}

// function qui crée les boutons filtre par catégories
function createButtonFilter(categoryFetch) {
  // ajout d'une nouvelle catégories "Tous" en première position dans le tableau des catégories
  categoryFetch.unshift({ id: 0, name: `Tous` });
  // Récupère la div filter
  const filterDiv = document.querySelector(".filter");

  // Parcours chaque éléments des données de l'API catégories
  categoryFetch.forEach((category) => {
    // crée un élément button filtre pour chaques catégories
    const btnFilter = document.createElement("button");
    // ajoute à chaques buttons filtre la class .btn
    btnFilter.classList.add("btn");
    btnFilter.classList.add("btn-filter");
    // ajoute le nom de la catégories respective au bouton filtre provenant du tableau "categoryFetch"
    btnFilter.innerHTML = category.name;
    // ajoute un écouteur d'évènement
    addventListenerButtonFilter(worksFetch, category, btnFilter);
    // ajoute le bouton filtre à la div filter
    filterDiv.appendChild(btnFilter);
    // test
    // console.log(categoryFetch);
  });
}

// function pour ajouter un écouteur d'éènement sur les btnFilter
function addventListenerButtonFilter(works, category, element) {
  element.addEventListener("click", (event) => {
    // efface le style à tous les boutons
    removeStyleBtnSelectedFilter();
    // ajoute le style au bouton sélèctionner
    addStyleBtnSelectedFilter(element);
    // Récupère la DIV gallery
    const galleryDiv = document.querySelector(".gallery");
    // initialise un tableau vide pour les données filtrée par catégories
    let filterWorks = [];
    // Structure de controle pour savoir quelle index à été selectionner
    // Si le bouton "Tous" est cliqué
    if (category.id === 0) {
      // affiche toutes les données
      filterWorks = works;
      // console.log(filterWorks);
    } else {
      // sinon filtre les données en fonction de l'ID de la catégories selectionner
      filterWorks = categoryFilter(worksFetch, category.id);
      // controle
      // console.log(filterWorks);
    }
    // effacement de la page html
    galleryDiv.innerHTML = "";

    // affiche les données filtrer pour la catégorie selectionner
    createFigure(filterWorks);

    // test de position
    console.log(`j'écoute le bouton : "${category.name}"`);
  });
}

// function qui assigne le style au bouton selectionner
function addStyleBtnSelectedFilter(element) {
  // element.addEventListener("click", (event) => {
  element.classList.add("btn-selected");
}

// function qui enlève le style au bouton selectionner
function removeStyleBtnSelectedFilter() {
  const buttonfilter = document.querySelectorAll(".btn");
  buttonfilter.forEach((element) => {
    element.classList.remove("btn-selected");
    // console.log(element);
  });
}

function checkAuthentification() {
  // récupère le token dans le localStorage
  const token = localStorage.getItem(`token`);
  // test
  // console.log("j'ai récupérer le token :", token);

  // Si user authentifier authentifieé
  if (token) {
    // créer la barre Mode édition
    const barModeEdition = document.createElement("div");
    barModeEdition.classList.add("bar-mode-edition");
    barModeEdition.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z" fill="white"/>
      </svg>
      <p class="mode-edition">Mode édition</p>
    `;

    // récupère le header
    const header = document.querySelector("header");
    // je place la barModeEdition avant le header
    document.body.insertBefore(barModeEdition, header);
  }
}

// fonction d'initialisation
async function init() {
  // récupère les données API works et stock dans la variable
  worksFetch = await fetchWorks();
  // récupère les données API categories
  const categoryFetch = await fetchCategory();
  // Test de fonctionnement
  // console.log(worksFetch, categoryFetch);

  // **********appelle la fonction qui

  // créer l'élément figure
  createFigure(worksFetch);

  // filtre par catégories
  categoryFilter(worksFetch);

  // crée les boutons filtre
  createButtonFilter(categoryFetch);

  // test après être authentifier
  checkAuthentification();
}

// appel de la fonction d'initialisation au chargement de la page
init();
