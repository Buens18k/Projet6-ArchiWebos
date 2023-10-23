// api.js
import { fetchWorks } from "./api.js";

// ui.js
import { createWork, createAddNewFigure, deleteWork } from "./ui.js";

// Variable global qui permet de savoir quel modal est ouvert
let modal;

/********* Affiche le "Modal DELETE" ************** */

// Fonction ajoute un gestionnaire d'écoute évenement au boutton "Modifier" pour ouvrir le modale1
export function addEventListenerModalDelete() {
  // Récupère le bouton "modifier"
  const btnModify = document.querySelector(".link-modifier");

  // Ajout d'un gestionnaire d'écoute à l'évenement au "clic" sur le bouton "modifier"
  btnModify.addEventListener("click", (event) => {
    event.preventDefault();
    // Récupérer le modal
    const asideModalDelete = document.getElementById("modal1");
    // Ajoute un attribut
    asideModalDelete.setAttribute("aria-modal", "true");
    // Ajoute le style pour rendre visible le modal DELETE
    asideModalDelete.style.display = "flex";
    // Sauvegarde la boite modal
    modal = asideModalDelete;
  });
}

// Fonction pour créer une figure et ces éléments dans le Modal DELETE
export function createWorkDelete(work) {
  // Récupère le selecteur "cta-img-svg"
  const ctaImgSvg = document.querySelector(".cta-img-svg");
  // Crée l'élément "figure" qui contiendra des éléments
  const figureCta = document.createElement("figure");
  // Ajoute un style
  figureCta.classList.add("cta-img-svg_content");
  // Ajout d'un ID unique à chaque containeur
  figureCta.dataset.id = work.id;
  // Créer un élément img
  const imgModal1 = document.createElement("img");
  // Ajoute une class pour le style
  imgModal1.classList.add("image-modal1");
  // Définie la source de l'image en récupèrant l'URL de l'image dans l'API works
  imgModal1.src = work.imageUrl;

  // Crée l'élément SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "9");
  svg.setAttribute("height", "11");
  svg.setAttribute("viewBox", "0 0 9 11");
  svg.setAttribute("fill", "none");
  svg.innerHTML = `
      <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
    `;
  svg.classList.add("svg-modal1");
  // Ajout d'un id a chaque svg
  svg.dataset.id = work.id;

  // Ajout d'un gestionnaire d'évenement au click sur le svg (corbeille)
  // Et appel la fonction qui exécuteras la suppression au click
  svg.addEventListener("click", handleDeleteImage);

  // L'image et le svg enfant du figureCta et figureCta enfant de la div "ctaImgSvg"
  figureCta.appendChild(imgModal1);
  figureCta.appendChild(svg);
  ctaImgSvg.appendChild(figureCta);
  // Retourne la figure
  return figureCta;
}

/********* Requête pour supprimer une photo du "Modal DELETE" ************** */

// Fonction qui supprime l'image du Modal DELETE
export async function handleDeleteImage(event) {
  event.preventDefault();
  // Rechercher le parent "figure" de l'élément svg cliqué
  const figureElement = event.currentTarget.closest("figure");

  // Rècupère dans les données l'ID cliqué
  const imageId = event.currentTarget.dataset.id;

  // Verifie si l'ID (undefined, nombre entier, supèrieur à 0)
  if (imageId !== undefined && Number.isInteger(parseInt(imageId)) && parseInt(imageId) > 0) {
    // Récupère le token dans le Local Storage
    const token = localStorage.getItem("token");

    // Si le token est dans le localStorage ou avec du texte
    if (token && token.trim() !== "") {
      // Tente d'envoyez une requête DELETE auprès de l'API pour supprimer l'image
      try {
        // Envoie la requête DELETE vers l'API pour supprimer l'image avec l'ID spécifié
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
          // Utilise la méthode DELETE pour la suppression
          method: "DELETE",
          // Ajoute les en-têtes, y compris le type de contenu et le token d'authentification
          headers: {
            "Content-Type": `application/json`, //type de contenu en JSON
            /***********
             * - Ajoute le token au header
             * - Authorization pour inclure le jeton("Bearer") et le token (authentifier)
             ***********  */
            Authorization: `Bearer ${token}`,
          },
        });
        // Gestion de la réponse provenant de l'API
        if (response.ok) {
          console.log("l'id supprimé :", imageId);
          // Supprime le figure du DOM
          figureElement.remove();
          // Mise à jour de la gallery en convertissant la valeur de "imageId"
          deleteWork(parseInt(imageId));

          // Message
          console.log("image supprimée ok !!!");
        } else {
          console.log("la suppression à echouer");
        }
      } catch (error) {
        console.log("erreur lors de la suppression de l'image", error);
      }
    } else {
      console.log("token d'authentification invalide");
    }
  } else {
    console.log("l'ID de l'image invalide");
  }
}

/********* Affiche le Modal "Ajoute photo" ou retour sur le "Modal DELETE" ************** */

// Fonction qui ajoute un gestionnaire d'évenement au bouton "Ajouter une image"
export function btnAddPhotoListener() {
  // Récupère le bouton "Ajouter une image"
  const btnAddPhoto = document.querySelector(".add-photo-modal1");

  // Ajoute le gestionnaire d'écoute au click sur le bouton
  btnAddPhoto.addEventListener("click", (event) => {
    event.preventDefault();

    // Récupère la div Modal Delete
    const modalDelete = document.querySelector(".modal-wrapper");
    // Fait disparaitre le Modal Delete
    modalDelete.style.display = "none";

    // récupère la div Modal qui va ajouter une photo
    const modalAddPhoto = document.querySelector(".modal_add-photo");
    // Fait apparaître le modal Add photo
    modalAddPhoto.style.display = "flex";
  });
}

// Fonction qui ajoute un gestionnaire d'évenement au SVG back
export function svgBackListener() {
  // Récupère le svg back
  const svgBack = document.querySelector(".back-delete");
  // Ajout d'un gestionnaire d'écoute au clic sur le SVG (flèche)
  svgBack.addEventListener("click", (event) => {
    event.preventDefault();

    // Récupère la div Modal Delete
    const modalDelete = document.querySelector(".modal-wrapper");
    // Fait aparaitre le Modal Delete
    modalDelete.style.display = "flex";

    // Récupère la div Modal qui va ajouter une photo
    const modalAddPhoto = document.querySelector(".modal_add-photo");
    console.log("Ont rend visible la div : ", modalAddPhoto);
    // Fait disparaître le modal Add photo
    modalAddPhoto.style.display = "none";
  });
}

/********* Ajoute photo dans le Modal avec l'input "+ Ajout photo" ************** */

// Fontion qui ajoute une photo lors du clic sur l'input "+ Ajout Photo"
export function btnAddPhoto() {
  // Récupère l'input "+ Ajout Photo"
  const fileUploadInput = document.getElementById("input-file");
  // Ajout d'un gestionnaire d'évènement pour l'événement "change" de l'élément input de fichier
  fileUploadInput.addEventListener("change", handleFileSelect);
}

// Fonction qui vérifie le format et la taille de la photo charger puis l'affiche dans le modal ou non 
export function handleFileSelect(event) {
  event.preventDefault();

  // Variable contenant les fichiers accepter
  const file_extension_regex = /\.(jpg|png)$/i;
  const max_file_size = 4 * 1024 * 1024;

  // Vérifie si un fichier existe et vérifie le format et l'extension
  if (this.files.length === 0 || !file_extension_regex.test(this.files[0].name)) {
    console.log(`fichier pas accepter en raison de l'extension : "${this.files[0].name}"`);
    return;
  }

  // Vérifier la taille du fichier
  if (this.files[0].size > max_file_size) {
    console.log(`fichier pas accepter en raison de la taille : "${this.files[0].size}"`);
    return;
  }

  // Stock le fichier dans une variable
  const file = this.files[0];
  // Créer une instance
  const file_reader = new FileReader();
  //  Convertit le fichier en URL
  file_reader.readAsDataURL(file);
  // Ajout d'un gestionnaire d'évenement au fichier
  file_reader.addEventListener("load", (event) => {
    event.preventDefault();
    // Appel la fonction qui ajoute l'image
    displayImage(event, file);
  });
}

// Fonction qui ajoute l'image dans la div "image-content"
function displayImage(event, file) {
  event.preventDefault();

  // Récupère la div "add-photo"
  const addPhotoDiv = document.querySelector(".add-photo");
  // Récupère la div qui contient la nouvelle image et l'input "file"
  const imageContentDiv = document.getElementById("image-content");
  // Désactive la div "add-photo"
  addPhotoDiv.style.display = "none";
  // Active la div "image-content"
  imageContentDiv.style.display = "flex";
  // Récupère le label "label-file" pour le rendre invisble
  const labelInputFile = document.getElementById("label-file");
  labelInputFile.classList.add("opacity");
  labelInputFile.style.opacity = "0";
  // Récupère l'input "input-file "pour l'agrandir et permettre de reselectionner une nouvelle photo
  const inputFile = document.getElementById("input-file");
  inputFile.style.top = "127px";
  inputFile.style.left = "124px";
  inputFile.style.width = "60%";
  inputFile.style.height = "28%";
  // Récupère l'image existante
  const existingImage = imageContentDiv.querySelector("img");
  if (existingImage) {
    // Si une image existe met à jour la source et l'attribut "alt"
    existingImage.src = event.target.result;
    existingImage.alt = file.name;
  } else {
    // Sinon crée l'élément <img>
    const image = document.createElement("img");
    image.classList.add("img-onload");
    image.setAttribute("alt", file.name);
    image.src = event.target.result;
    // Ajoute au DOM du parent "imageContentDiv" l'image
    imageContentDiv.appendChild(image);
  }
}

/********* Envoie Formulaire à l'appuie du bouton "VALIDER" à l'API POST WORK************** */

// Ajoute un gestionnaire d'écoute au formulaire qui est valider par l'input "Valider"
export async function addListenerForm() {
  // Récupère le formulaire
  const form = document.querySelector(".add-photo_form");
  // Ajout d'un gestionnaire d'écoute de type "change" au formulaire, si tous les champs sont remplis, l'input "Valider" change de couleur
  form.addEventListener("change", updateInputForm);
  // Ajout d'un gestionnaire d'ecoute de type "submit" pour soummettre le formulaire
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Effectue ce bloc
    try {
      // Récupère le token
      const token = localStorage.getItem("token");
      // Crée une nouvel instance pour rassembler toutes les valeurs des champs du formulaire passer en paramètre
      const formData = new FormData(form);
      // Variable qui contient les options de  configuration pour la requête HTTP
      const requestOptions = {
        // Méthode
        method: "POST",
        // En-tête
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Corps de la requête
        body: formData,
      };
      // Effectue une requête HTTP vers l'URL et en récupérant les options de configuration
      const response = await fetch("http://localhost:5678/api/works", requestOptions);

      // Gestion de la réponse en fonction du status
      if (response.ok) {
        const data = await response.json();
        if (response.status === 201) {
          // Mets à jour les figures
          updateUi();
          // Message de confirmation de création, avec l'intitulé de ce qui à été ajouter à l'API
          console.log("Formulaire enregistrer dans la base de données :", data);
        } else {
          console.error("Erreur API");
        }
      } else {
        const errorData = await response.json();
        console.error("Erreur API :", errorData.message);
      }
    } catch (error) {
      console.error("Erreur inattendue :", error.message);
    }
  });
}

// Fonction qui parcours les figures dans l'ensemble par rapport au données
async function updateUi() {
  // Récupère les nouvelles données depuis l'API
  const newWorks = await fetchWorks();
  // Ajoutez la nouvelle figures à la home page edit
  newWorks.forEach((newWork) => {
    // Mets à jour les figures dans la home page
    createWork(newWork);
    // Mets à jour les figures pour le Modal DELETE
    createAddNewFigure(newWork);
  });
}

// Fonction qui change la couleur de l'input "VALIDER"
function updateInputForm() {
  // Récupération des valeurs du forulaire
  const imageInput = document.getElementById("input-file");
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("category");

  // Récupère l'input "Valider"
  const inputFormValider = document.getElementById("valide");

  // Vérifie si tous les champs sont remplis
  if (imageInput.value && titleInput.value && categoryInput.selectedIndex !== 0) {
    // Si tous les champs sont remplis, change la couelur de l'input
    inputFormValider.style.backgroundColor = "#1D6154";
  } else {
    // Sinon garde la couleur initiale
    inputFormValider.style.backgroundColor = "#a7a7a7";
  }
}

/********* Fermeture du Modal************** */

// Fonction pour fermer le modal au click sur l'extèrieur du modal (partie grisé)
export function closeModalOnOutsideClik() {
  // Récupère le modal "aside"
  const aside = document.querySelector(".modal");
  // Ajoute un gestionnaire d'évenement au clic
  aside.addEventListener("click", (event) => {
    // Si le click de la souris est entendu sur le parent (et non les enfants) donc la partie grisé alors
    if (event.target === aside) {
      // Masque le modal en changeant le style de display à "none"
      aside.style.display = "none";
      // Mets à jour le modal selectionner
      modal = "null";
    }
  });
}

// Fonction qui ferme le modal en cliquant sur le svg croix
export function closeModalOnClickSvgCross() {
  // Récupère le svg en question
  const aside = document.querySelector(".modal");

  // Récupère le svg en question
  const closeBtns = document.querySelectorAll(".close-modal");
  // Parcours les éléments ayant le selecteur "close-modal"
  closeBtns.forEach((closeBtn) => {
    // Ajoute un gestionnaire d'évenement au svg
    closeBtn.addEventListener("click", () => {
      // Modifie le style du Modal afin de le désactiver
      aside.style.display = "none";
      // Mets à jour le modal selectionner
      modal = "null";
    });
  });
}
