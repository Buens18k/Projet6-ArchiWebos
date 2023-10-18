// import { error } from "console";
import { fetchWorks, categoryFilter } from "./api.js";

// ui.js
import { createFigure, createWork, createButtonFilter, addEventListenerButtonFilter, populateCategoriesDropDown } from "./ui.js";

// // variable qui permet de savoir quel modal est ouvert
let modal;

/********* Affiche le "Modal DELETE" ************** */

// fonction ajoute un gestionnaire d'écoute évenement au boutton "Modifier" pour ouvrir le modale1
export function addEventListenerModalDelete() {
  // récupère le boutton "modifier"
  const btnModify = document.querySelector(".link-modifier");
  // console.log(btnModify);

  if (btnModify) {
    // ajout un gestionnaire d'écoute à l'évenement au "click"
    btnModify.addEventListener("click", (event) => {
      event.preventDefault();
      // récupérer le modal
      const asideModalDelete = document.getElementById("modal1");
      asideModalDelete.setAttribute("aria-modal", "true");

      // ajoute le style pour rendre visible le modal DELETE
      asideModalDelete.style.display = "flex";
      // sauvegarde la boite modal
      modal = asideModalDelete;
      // controle
      // console.log("aside modal Delete est activé et enregistrer", modal);
    });
  }
}

// fonction pour afficher les images et le svg dans le modal DELETE
export function displayImageInModal(worksFetch) {
  // parcourir les données de l'API works
  worksFetch.forEach((work) => {
    createWorkDelete(work);
  });
}

// Fonction pour créer une figure et ces éléments qui le composera dans le Modal DELETE
function createWorkDelete(work) {
  // récupère la div figure-modal1
  const imagesModal1Div = document.querySelector(".cta-img-svg");
  // créer un container pour recevoir l'image et le svg
  const container = document.createElement("figure");
  container.classList.add("cta-img-svg_content");
  // Ajout d'un ID unique à chaque containeur
  container.dataset.id = work.id;
  // console.log("ajout id sur container",container.dataset.id);
  // créer un élément img
  const imgModal1 = document.createElement("img");
  // ajoute une class pour le style
  imgModal1.classList.add("image-modal1");
  // définie la source de l'image en récupèrant l'URL de l'image dans l'API works
  imgModal1.src = work.imageUrl;

  // créer l'élément SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "9");
  svg.setAttribute("height", "11");
  svg.setAttribute("viewBox", "0 0 9 11");
  svg.setAttribute("fill", "none");
  svg.innerHTML = `
      <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
    `;
  svg.classList.add("svg-modal1");
  // ajout d'un id a chaque svg
  svg.dataset.id = work.id;
  // console.log("ajout id du svg",svg.dataset.id);

  // ajout d'un gestionnaire d'évenement au click sur le svg (corbeille)
  // et appel la fonction qui exécuteras la suppression au click
  svg.addEventListener("click", handleDeleteImage);

  // image et le svg enfant du container et le container enfant de la div "imagesModal1Div"
  container.appendChild(imgModal1);
  container.appendChild(svg);
  imagesModal1Div.appendChild(container);

  return container;
}

/********* Requête pour supprimer une photo du "Modal DELETE" ************** */

// fonction supprime l'image du Modal DELETE
export async function handleDeleteImage(event) {
  event.preventDefault();
  // rechercher le parent "figure" de l'élément svg cliqué
  const figureElement = event.currentTarget.closest("figure");

  // rècupère l'ID de l'image à supprimer à partir du dataset du SVG cliké
  const imageId = event.currentTarget.dataset.id;
  console.log("je supprime le svg", imageId);

  // Verifie si l'ID de l'image existe bien dans la base de donnée
  if (imageId !== undefined && Number.isInteger(parseInt(imageId)) && parseInt(imageId) > 0) {
    // récupère le token dans le Local Storage
    const token = localStorage.getItem("token");

    // si le token est dans le local storage
    if (token && token.trim() !== "") {
      // tente d'envoyez une requête DELETE auprès de l'API pour supprimer l'image
      try {
        // envoie la requête DELETE vers l'API pour supprimer l'image avec l'ID spécifié
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
          // utilise la méthode DELETE pour la suppression
          method: "DELETE",
          // ajoute les en-têtes, y compris le type de contenu et le token d'authentification
          headers: {
            "Content-Type": `application/json`, //type de contenu en JSON
            /***********
             * - ajoute le token au header
             * - Authorization pour inclure le jeton("Bearer") et le token (authentifier)
             ***********  */
            Authorization: `Bearer ${token}`,
          },
        });
        // gestion de la réponse provenant de l'API
        if (response.ok) {
          // récupère les données API works et stock dans la variable
          const worksFetch = await fetchWorks();
          // Mets à jour les figures
          createFigure(worksFetch);
          // supprime le figure du DOM
          figureElement.remove();
          // controle
          console.log("image supprimée ok !!!");

          // supprime le container et le svg

          containerImgSvg.remove();
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

// fonction qui ajoute un gestionnaire d'évenement au bouton "Ajouter une image"
export function btnAddPhotoListener() {
  // récupérer le bouton "Ajouter une image"
  const btnAddPhoto = document.querySelector(".add-photo-modal1");

  // ajoute le gestionnaire d'écoute au click sur le bouton
  btnAddPhoto.addEventListener("click", (event) => {
    event.preventDefault();
    // console.log("j'entend le bouton add photo");

    // récupère la div Modal Delete
    const modalDelete = document.querySelector(".modal-wrapper");
    // console.log("ont rend invisible la div : ", modalDelete);
    // ont fait disparaitre la div
    modalDelete.style.display = "none";

    // récupère la div Modal qui va ajouter une photo
    const modalAddPhoto = document.querySelector(".modal_add-photo");
    // console.log("Ont rend visible la div : ", modalAddPhoto);
    // ont fait apparaître le modal Add photo
    modalAddPhoto.style.display = "flex";
  });
}

// fonction qui ajoute un gestionnaire d'évenement au SVG back
export function svgBackListener() {
  // récupère le svg back
  const svgBack = document.querySelector(".back-delete");
  // console.log(svgBack);
  svgBack.addEventListener("click", (event) => {
    event.preventDefault();

    // console.log("j'écoute le svg Back");
    // récupère la div
    // récupère la div Modal Delete
    const modalDelete = document.querySelector(".modal-wrapper");
    console.log("ont rend invisible la div : ", modalDelete);
    // ont fait disparaitre la div
    modalDelete.style.display = "flex";

    // récupère la div Modal qui va ajouter une photo
    const modalAddPhoto = document.querySelector(".modal_add-photo");
    console.log("Ont rend visible la div : ", modalAddPhoto);
    // ont fait apparaître le modal Add photo
    modalAddPhoto.style.display = "none";
  });
}

/********* Ajoute photo dans le Modal avec l'input "+ Ajout photo" ************** */

// fontion ajout photo lors du clic sur l'input "+ Ajout Photo"
export function btnAddPhoto() {
  // récupère le l'input "+ Ajout Photo"
  const fileUploadInput = document.getElementById("form_input-file");
  // console.log(fileUploadInput);
  fileUploadInput.accept = "image/jpg, image/png";

  fileUploadInput.addEventListener("change", handleFileSelect);
}

// fonction qui charge la photo et vérifie le format et la taille puis l'affiche dans le modal
export function handleFileSelect(event) {
  event.preventDefault();

  // variable contenant les fichiers accepter
  const file_extension_regex = /\.(jpg|png)$/i;
  const max_file_size = 4 * 1024 * 1024;

  // vérifie l'extension du fichier
  if (this.files.length === 0 || !file_extension_regex.test(this.files[0].name)) {
    console.log(`fichier pas accepter en raison de l'extension : "${this.files[0].name}"`);
    return;
  }

  // vérifier la taille du fichier
  if (this.files[0].size > max_file_size) {
    console.log(`fichier pas accepter en raison de la taille : "${this.files[0].size}"`);
    return;
  }

  // test de récupération du nom du fichier image selectionner dans l'input
  console.log("fichier accepter", this.files);

  // stock le fichier
  const file = this.files[0];
  // console.log(file);
  // créer une instance
  const file_reader = new FileReader();
  // ajoute à l'instance le fichier convertit en URL
  file_reader.readAsDataURL(file);
  // ajout d'un gestionnaire d'évenement au fichier
  file_reader.addEventListener("load", (event) => {
    event.preventDefault();
    // appel la fonction qui ajoute l'image
    displayImage(event, file);
  });
}

// fonction qui ajoute l'image dans la div "image-content"
function displayImage(event, file) {
  event.preventDefault();

  // récupère la div "add-photo"
  const addPhotoDiv = document.querySelector(".add-photo");
  // récupère la div qui contient la nouvelle image et l'input "file"
  const imageContentDiv = document.getElementById("image-content");
  // désactive la div "add-photo"
  addPhotoDiv.style.display = "none";
  // active la div "image-content"
  imageContentDiv.style.display = "flex";
  // récupère le label "form_label-file" pour le rendre invisble
  const labelInputFile = document.getElementById("form_label-file");
  labelInputFile.classList.add("opacity");
  labelInputFile.style.opacity = "0";
  // récupère l'input "form_input-file "pour l'agrandir et permettre de reselectionner une nouvelle photo
  const inputFile = document.getElementById("form_input-file");
  inputFile.style.top = "127px";
  inputFile.style.left = "124px";
  inputFile.style.width = "60%";
  inputFile.style.height = "28%";

  // vérifie si la div contient déjà une image
  const existingImage = imageContentDiv.querySelector("img");
  if (existingImage) {
    existingImage.src = event.target.result;
    existingImage.alt = file.name;
  } else {
    const image = document.createElement("img");
    image.classList.add("img-onload");
    image.setAttribute("alt", file.name);
    image.src = event.target.result;
    // ajoute au DOM du parent "imageContentDiv" l'image
    imageContentDiv.appendChild(image);
  }
}

/********* Envoie Formulaire à l'appuie du bouton "VALIDER" à l'API POST WORK************** */

// ajoute un gestionnaire d'écoute au formulaire qui est valider par l'input "Valider"
export async function addListenerForm() {
  const form = document.querySelector(".add-photo_form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const form = document.querySelector(".add-photo_form");
      // console.log(form);

      // récupère le token
      const token = localStorage.getItem("token");
      // créez une nouvel instance
      const formData = new FormData(form);

      const requestOptions = {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const response = await fetch("http://localhost:5678/api/works", requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log("Réponse de l'API", data.message);
        if (response.status === 201) {
          console.log("Formulaire enregistrer dans la base de données", data.message);
          // récupère les données API works et stock dans la variable
          const worksFetch = await fetchWorks();
          // Mets à jour les figures
          createFigure(worksFetch);

          console.log("création réussie :", data);
        } else {
          console.error("Erreur API :", data.message);
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

/********* Fermeture du Modal************** */

// fonction pour fermer le modal au click sur l'extèrieur du modal (partie grisé)
export function closeModalOnOutsideClik() {
  // ferme le modal lorsque l'utilisateur click à l'extèrieur du contenu du modal
  const aside = document.querySelector(".modal");
  aside.addEventListener("click", (event) => {
    // Si le click de la souris est entendu sur le parent (et non les enfants) donc la partie grisé alors
    if (event.target === aside) {
      // masque le modal en changeant le style de display à "none"
      aside.style.display = "none";
      modal = "null";
      console.log("entendu clic sur la partie grisé fermeture du modal");
    }
  });
}

// fonction qui ferme le modal en cliquant sur le svg croix
export function closeModalOnClickSvgCross() {
  // récupère le svg en question
  const aside = document.querySelector(".modal");

  // récupère le svg en question
  const closeBtns = document.querySelectorAll(".close-modal");
  // console.log(closeBtns);

  closeBtns.forEach((closeBtn) => {
    // ajoute un gestionnaire d'évenement au svg
    closeBtn.addEventListener("click", () => {
      // puis ont ferme le modale
      aside.style.display = "none";
      modal = "null";
      console.log("écoute clik sur le SVG cross fermeture du modal");
    });
  });
}
