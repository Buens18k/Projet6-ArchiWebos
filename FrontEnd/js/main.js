// api.js
import { fetchWorks, fetchCategory} from "./api.js";

// ui.js
import { createFigure, createButtonFilter, addEventListenerButtonFilter, populateCategoriesDropDown } from "./ui.js";

// auth.js
import { checkAuthentification } from "./auth.js";

// modal.js
import { btnAddPhotoListener, svgBackListener, btnAddPhoto, addListenerForm, closeModalOnOutsideClik, closeModalOnClickSvgCross } from "./modal.js";


// fonction d'initialisation
async function init() {
  
  // Récupère les données API works et stock dans la variable
  const worksFetch = await fetchWorks();
  // Récupère les données API categories
  const categoryFetch = await fetchCategory();

/******************* Appel la fonction qui  ***************************** */

  // créer l'élément figure
  createFigure(worksFetch);

  // crée les boutons filtre
  createButtonFilter(categoryFetch, worksFetch, addEventListenerButtonFilter);

  // test après être authentifier
  checkAuthentification();

  // écoute le bouton "Ajouter une photo"
  btnAddPhotoListener();
  // écoute le SVG Back
  svgBackListener();

  // remplie la liste déroulante de l'input
  await populateCategoriesDropDown();

  //  écoute le bouton "+ Ajout photo"
  btnAddPhoto();
  // Ajoute un gestionnaire d'écoute au formulaire
  addListenerForm();

  // ferme le modal lors du clik sur la partie grisé
  closeModalOnOutsideClik();
  // ferme le modal lors du clik sur le SVG cross
  closeModalOnClickSvgCross();

}

// appel de la fonction d'initialisation au chargement de la page
init();
