// api.js
import { fetchWorks, fetchCategory, categoryFilter } from "./api.js";

// ui.js
import { createFigure, createButtonFilter, existingFigureIds, addEventListenerButtonFilter, populateCategoriesDropDown } from "./ui.js";

// auth.js
import { checkAuthentification, barModeEdition, addSvgAncre, logoutUser } from "./auth.js";

// modal.js
import {
  addEventListenerModalDelete,
  displayImageInModal,
  handleDeleteImage,
  btnAddPhotoListener,
  svgBackListener,
  btnAddPhoto,
  handleFileSelect,
  addListenerForm,
  closeModalOnOutsideClik,
  closeModalOnClickSvgCross,
} from "./modal.js";

// Variable globale récupérant les travaux de l'API works
// let worksFetch;

// fonction pour gérer la deconnexion de l'utilisateur lorsque la page ce ferme
function disconnectClosingWindow() {
  window.addEventListener("unload", (event) => {
    // récupère le token dans le localStorage
    const token = localStorage.getItem("token");

    // Vérifier si le token est présent
    if (token) {
      // supprime le token du locale Storage
      localStorage.removeItem("token");
    }
  });
}

// fonction d'initialisation
async function init() {
  // récupère les données API works et stock dans la variable
  const worksFetch = await fetchWorks();
  // récupère les données API categories
  const categoryFetch = await fetchCategory();
  // Test de fonctionnement
  console.log(worksFetch, categoryFetch);

  // **********appel la fonction qui

  // créer l'élément figure
  createFigure(worksFetch);
  // filtre par catégories
  categoryFilter(worksFetch);
  // crée les boutons filtre
  createButtonFilter(categoryFetch, worksFetch, addEventListenerButtonFilter);

  // test après être authentifier
  checkAuthentification();

  // ajouter les images dans la div figure-modal1 du modal1
  displayImageInModal(worksFetch);

  // écoute le bouton "Ajouter une photo"
  btnAddPhotoListener();
  // écoute le SVG Back
  svgBackListener();

  // remplie la liste déroulante de l'input
  await populateCategoriesDropDown();

  //  écoute le bouton "+ Ajout photo"
  btnAddPhoto();
  // valide le
  addListenerForm();

  // ferme le modal lors du clik sur la partie grisé
  closeModalOnOutsideClik();
  // ferme le modal lors du clik sur le SVG cross
  closeModalOnClickSvgCross();

  // déconnecte lors de la fermeture de la page du navigateur
  // disconnectClosingWindow();
}

// appel de la fonction d'initialisation au chargement de la page
init();