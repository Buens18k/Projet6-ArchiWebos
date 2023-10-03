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

    // appelle de la fonction qui fait disparaitre les boutons lorsque le user est connecter
    disappearBntFilterDisplay();
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

// function check l'authentification si true(grâce au token récupérer dans le localStorage)
// alors on créer la barre Mode édition
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

// function check l'autification si oui ont fait disparaitre les btnFilters
function disappearBntFilterDisplay() {
  // récupère le token
  const token = localStorage.getItem("token");
  // récupère la div filter
  const filterDiv = document.querySelector(".filter");

  // vérifie si le user est authentifier
  if (token) {
    filterDiv.style.display = "none";
  } else {
    filterDiv.style.display = "flex";
  }
}

// function ajoute le svg + l'ancre modifier
function addSvgAncre() {
  // récupère le token
  const token = localStorage.getItem("token");

  if (token) {
    // Créer le SVG
    const editSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    editSvg.setAttribute("width", "16");
    editSvg.setAttribute("height", "16");
    editSvg.setAttribute("viewBox", "0 0 16 16");
    editSvg.setAttribute("fill", "none");
    editSvg.innerHTML = `
      <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>    
    `;
    editSvg.classList.add("edit-svg");

    // Créer l'ancre modifier
    const editLinkModify = document.createElement("a");
    editLinkModify.setAttribute("href", "#");
    editLinkModify.innerText = "modifier";
    editLinkModify.classList.add("link-modifier");

    // récupère le titre H2 de lasection portfolio
    const h2Title = document.querySelector("#portfolio h2");
    h2Title.classList.add("modify-h2");
    // ajoute a côté du h2
    h2Title.appendChild(editSvg);
    h2Title.appendChild(editLinkModify);
  }
}

// function qui supprime le token lors de la fermeture de la page
function logOutListener() {
  window.addEventListener(`beforeunload`, (event) => {
    // supprime le token du local Storage lors de la fermeture de la page
    localStorage.removeItem("token");
  });
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

  //  créer le svg et l'ancre si authentifier
  addSvgAncre();

  // supprime le token du localStorage à la fermeture de la page si authentifier
  logOutListener();
}

// appel de la fonction d'initialisation au chargement de la page
init();
