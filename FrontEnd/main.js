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
    // ajoute le nom de la catégories respective au bouton filtre provenant du tableau "categoryFetch"
    btnFilter.innerHTML = category.name;
    // ajoute un écouteur d'évènement
    addventListenerButtonFilter(worksFetch, category, btnFilter);
    // ajoute le bouton filtre à la div filter
    filterDiv.appendChild(btnFilter);
    // test
    console.log(categoryFetch);
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
}

// appel de la fonction d'initialisation au chargement de la page
init();
