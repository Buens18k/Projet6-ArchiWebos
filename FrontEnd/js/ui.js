// api.js
import { fetchCategory } from "./api.js";
// modal.js
import { createWorkDelete } from "./modal.js";

// Crée une nouvelle instance d'ensemble
export const existingFigureIds = new Set();

// Fonction qui créer les éléments HTML pour chaque figure et les affiches dans la gallery
export function createFigure(works) {
  // Parcours la liste des données de l'API works
  works.forEach((work) => {
    // Appel de la fonction qui crée une figure pour chaque objets dans les données de l'API works
    createWork(work);
  });
}

// Function qui crée un élément "figure" dans la Div "gallery"
export function createWork(work) {
  // Vérifiez si l'ID de la figure n'est pas déjà présente dans l'ensemble
  if (!existingFigureIds.has(parseInt(work.id))) {
    // Met à jour le Modal Delete en créant la nouvelle figure ajouter à l'API
    createWorkDelete(work);
    // Met à jour l'objet "existingFigureIds" en ajoutant l'ID à l'ensemble
    existingFigureIds.add(work.id);
    
    /*Mets à jour la page */
    // Récupère la div gallery
    const galleryDiv = document.querySelector(".gallery");
    // Crée un élément figure
    const workFigure = document.createElement("figure");
    // Ajoute un attribut "data-id" avec comme valeur son ID depuis les données de l'API
    workFigure.setAttribute(`data-id`, work.id);
    // Remplit l'élément figure avec les propriétés "imageUrl, title" de l'API
    workFigure.innerHTML = `
          <img src ="${work.imageUrl}" alt="${work.title}">
          <figcaption>${work.title}</figcaption>
        `;
    // Ajoute l'élément "figure" à la div "gallery"
    galleryDiv.appendChild(workFigure);
  }
}

// Function qui efface le travaux et à l'ensemble 
export function deleteWork(work) {
  console.log("fonction delete", existingFigureIds, work);
  // Vérifiez si l'ID de la figure n'est pas déjà présente dans l'ensemble
  if (existingFigureIds.has(work)) {
    // Si l'ID existe, supprime l'ID à l'ensemble
    existingFigureIds.delete(work);
    // Selectionne dans le HTML, l'élément ayant ce data-id et supprime le.
    document.querySelector(`[data-id="${work}"]`).remove();
  }
}

// Function qui ajoute un élément "figure" dans la Div "gallery"
export function createAddNewFigure(work) {
  console.log("condition");

  // Vérifiez si l'ID de la figure n'est pas déjà présente dans l'ensemble "existingFigureIds"
  if (!existingFigureIds.has(work.id)) {
    // Si l'ID existe pas, ajoute l'ID à l'ensemble "existingFigureIds"
    existingFigureIds.add(work.id);
    // console.log("Elément ajouter ",existingFigureIds);
  }
}

// Function qui crée les boutons filtre par catégories
export function createButtonFilter(categoryFetch, worksFetch, addEventListenerButtonFilter) {
  // Ajout d'une nouvelle catégories "Tous" en première position dans le tableau des catégories
  categoryFetch.unshift({ id: 0, name: `Tous` });
  // Récupère la div filter
  const filterDiv = document.querySelector(".filter");

  // Parcours chaque éléments des données de l'API catégories
  categoryFetch.forEach((category) => {
    // Crée un élément button filtre pour chaques catégories
    const btnFilter = document.createElement("button");
    // Ajoute à chaques buttons filtre la class .btn
    btnFilter.classList.add("btn");
    btnFilter.classList.add("btn-filter");
    // Ajoute le nom de la catégories respective au bouton filtre provenant du tableau "categoryFetch"
    btnFilter.innerHTML = category.name;
    // Ajoute un écouteur d'évènement
    addEventListenerButtonFilter(worksFetch, category, btnFilter);
    // Ajoute le bouton filtre à la div filter
    filterDiv.appendChild(btnFilter);
  });
}

// Function qui ajoute un gestionnaire d'écoute au clic sur les btnFilter
export function addEventListenerButtonFilter(worksFetch, category, element) {
  element.addEventListener("click", (event) => {
    // Empêche le comportement par défaut du clic
    event.preventDefault();
    // Efface le style à tous les boutons
    removeStyleBtnSelectedFilter();
    // Ajoute le style au bouton sélèctionner
    addStyleBtnSelectedFilter(element);
    // Récupère la DIV gallery
    const galleryDiv = document.querySelector(".gallery");
    // Effacement de la page html
    galleryDiv.innerHTML = "";

    // Stock la catégorie qui à été filtrer par la fonction "filterWorksByCategory" et ceux par rapport à l'id de la catégories selectionner
    const filterdWorks = filterWorksByCategory(worksFetch, category.id);

    // Clean l'instance d'objet
    existingFigureIds.clear();

    // Affiche les données filtrer pour la catégorie selectionner
    filterdWorks.forEach((work) => {
      // Appel la fonction qui va créer les works en lui donnant en paramètre les travaux filtrer
      createWork(work);
    });

    // Test de position
    console.log(`j'écoute le bouton : "${category.name}"`);
  });
}

// Function qui retire la class du style au bouton non selectionner
function removeStyleBtnSelectedFilter() {
  // Récupère tous les boutons filtre
  const buttonfilter = document.querySelectorAll(".btn");
  buttonfilter.forEach((element) => {
    // Retire le style à chaques boutons
    element.classList.remove("btn-selected");
  });
}

// Function qui ajoute une class pour le style du bouton selectionner
function addStyleBtnSelectedFilter(element) {
  // Ajoute une class
  element.classList.add("btn-selected");
}

// Fonction qui filtre les travaux par catégories
function filterWorksByCategory(works, selectedCategory) {
  if (selectedCategory === 0) {
    // Si la catégorie sélectionnée est "Tous", retourne tous les éléments
    return works;
  } else {
    // Sinon, filtre les éléments par la catégorie sélectionnée
    return works.filter((work) => work.categoryId === selectedCategory);
  }
}

/****************** Modal****************** */

// Fonction pour remplir le menu déroulant de l'input catégories
export async function populateCategoriesDropDown() {
  // Récupère l'input "catégories"
  const categoryDropDown = document.getElementById("category");

  // Récupère les données de l'API trier par catégorie
  const categorysData = await fetchCategory();

  // Créer une option vide
  const emptyOption = document.createElement("option");
  emptyOption.value = ""; // valeur vide
  emptyOption.textContent = ""; // texte Vide
  categoryDropDown.appendChild(emptyOption);

  // Remplissage du menu déroulant avec les catégories
  categorysData.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id; //id de la catégorie
    option.textContent = category.name; // nom de la catégorie
    // Ajoute dans le DOM
    categoryDropDown.append(option);
  });
}
