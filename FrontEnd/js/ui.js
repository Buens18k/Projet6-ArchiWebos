// api.js
import { fetchCategory, categoryFilter } from "./api.js";
// modal.js
import { createWorkDelete } from "./modal.js";
// Crée une nouvelle instance d'ensemble
export const existingFigureIds = new Set();

// fonction qui créer les éléments HTML pour chaque figure et les affiches dans la gallery
export function createFigure(works) {
  // parcours la liste des données de l'API works
  works.forEach((work) => {
    // appel de la fonction qui crée une figure pour chaque objets dans les données de l'API works
    createWork(work);
  });
}

// function qui crée un élément "figure" dans la Div "gallery"
export function createWork(work) {

  // Vérifiez si l'ID de la figure n'est pas déjà présente dans l'ensemble
  if (!existingFigureIds.has(parseInt(work.id))) {

    // Appel de la fonction qui supprime l'ID qui n'existe plus
    createWorkDelete(work);

    // Si l'ID existe pas, créez la figure et ajoute l'ID à l'ensemble
    existingFigureIds.add(work.id);
    // console.log("Elément ajouter ",existingFigureIds);

    // Récupère la div gallery
    const galleryDiv = document.querySelector(".gallery");
    // création de l'élément figure
    const workFigure = document.createElement("figure");

    workFigure.setAttribute(`data-id`, work.id);
    // remplit l'élément figure avec les propriétés "imageUrl, title" de l'API
    workFigure.innerHTML = `
          <img src ="${work.imageUrl}" alt="${work.title}">
          <figcaption>${work.title}</figcaption>
        `;
    // ajoute l'élément "figure" à la div "gallery"
    galleryDiv.appendChild(workFigure);
  }
}

// function qui efface un élément "figure" dans la Div "gallery"
export function deleteWork(work) {
  console.log("fonction delete", existingFigureIds, work);
  // Vérifiez si l'ID de la figure n'est pas déjà présente dans l'ensemble
  if (existingFigureIds.has(work)) {
    // Si l'ID existe pas, créez la figure et ajoute l'ID à l'ensemble
    existingFigureIds.delete(work);
    console.log("Elément supprimer ", existingFigureIds);
    // delete le data-id
    document.querySelector(`[data-id="${work}"]`).remove();
  }
}

// function qui ajoute un élément "figure" dans la Div "gallery"
export function createAddNewFigure(work) {
  console.log("condition");

  // Vérifiez si l'ID de la figure n'est pas déjà présente dans l'ensemble "existingFigureIds"
  if (!existingFigureIds.has(work.id)) {
    // Si l'ID existe pas, créez la figure et ajoute l'ID à l'ensemble "existingFigureIds"
    existingFigureIds.add(work.id);
    // console.log("Elément ajouter ",existingFigureIds);
  }
}

// function qui crée les boutons filtre par catégories
export function createButtonFilter(categoryFetch, worksFetch, addEventListenerButtonFilter) {
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
    addEventListenerButtonFilter(worksFetch, category, btnFilter);
    // ajoute le bouton filtre à la div filter
    filterDiv.appendChild(btnFilter);
    // test
    // console.log(categoryFetch);
  });
}

// function pour ajouter un écouteur d'évenement sur les btnFilter
export function addEventListenerButtonFilter(worksFetch, category, element) {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    // efface le style à tous les boutons
    removeStyleBtnSelectedFilter();
    // ajoute le style au bouton sélèctionner
    addStyleBtnSelectedFilter(element);
    // Récupère la DIV gallery
    const galleryDiv = document.querySelector(".gallery");
    // effacement de la page html
    galleryDiv.innerHTML = "";

    // Filtre les catégories 
    const filterdWorks = filterWorksByCategory(worksFetch, category.id);

    // clean le 
    existingFigureIds.clear();
    console.log("combien il reste d'id dans existing ", existingFigureIds);

    // affiche les données filtrer pour la catégorie selectionner
    filterdWorks.forEach((work) => {
      // existingFigureIds.add(work.id);
      console.log("nombre works après être filtrer dans existing ", existingFigureIds);
      // console.log("combien délément qui existe", existingFigureIds);
      createWork(work);
      console.log("combien de work vont être créer ", work);
    });

    // console.log(category.id);

    // test de position
    console.log(`j'écoute le bouton : "${category.name}"`);
  });
}

function filterWorksByCategory(works, selectedCategory) {
  // console.log("rentre dans le filtre")
  if (selectedCategory === 0) {
    console.log(selectedCategory);
    // Si la catégorie sélectionnée est "Tous", retourne tous les éléments
    return works;
  } else {
    // console.log("rentre dans le filtre");
    console.log(selectedCategory);

    // Sinon, filtre les éléments par la catégorie sélectionnée
    return works.filter((work) => work.categoryId === selectedCategory);
  }
}

// function qui assigne le style au bouton selectionner
function addStyleBtnSelectedFilter(element) {
  element.classList.add("btn-selected");
}

// function qui enlève le style au bouton selectionner
function removeStyleBtnSelectedFilter() {
  const buttonfilter = document.querySelectorAll(".btn");
  buttonfilter.forEach((element) => {
    element.classList.remove("btn-selected");
  });
}

/****************** Modal****************** */

// fonction pour remplir le menu déroulant de l'input catégories
export async function populateCategoriesDropDown() {
  // récupère l'input "catégories"
  const categoryDropDown = document.getElementById("category");

  // récupère les données de l'API trier par catégorie
  const categorysData = await fetchCategory();

  // créer une option vide
  const emptyOption = document.createElement("option");
  emptyOption.value = ""; // valeur vide
  emptyOption.textContent = ""; // texte Vide
  categoryDropDown.appendChild(emptyOption);

  // remplissage du menu déroulant avec les catégories
  categorysData.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id; //id de la catégorie
    option.textContent = category.name; // nom de la catégorie
    categoryDropDown.append(option);
  });
}
