// import { error } from "console";
import { categoryFilter, getCategoryId } from "./api.js";

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
  // récupère la div figure-modal1
  const imagesModal1Div = document.querySelector(".cta-img-svg");

  // console.log(imagesModal1Div);
  // parcourir les données de l'API works
  // pour chaque élément de l'API
  worksFetch.forEach((work) => {
    // créer un container pour recevoir l'image et le svg
    const container = document.createElement("div");
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
  });
}

/********* Requête pour supprimer une photo du "Modal DELETE" ************** */

// fonction supprime l'image du Modal DELETE
export async function handleDeleteImage(event) {
  event.preventDefault();
  // rècupère l'ID de l'image à supprimer à partir du dataset du SVG cliké
  const imageId = event.currentTarget.dataset.id;
  console.log("je supprime le svg", imageId);

  // simulation de suppression
  const response = { status: 200, message: "Image supprimer" };

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
          // controle
          console.log("image supprimée ok !!!");

          // supprime le container et le svg
          const containerImgSvg = event.currentTarget.parentNode;
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
    console.log("j'écoute le svg Back");
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
  const file_upload_input = document.getElementById("add-photo_btn");
  file_upload_input.accept = "image/jpg, image/png";

  file_upload_input.addEventListener("change", handleFileSelect);
}

// fonction qui charge la photo et vérifie le format et la taille puis l'affiche dans le modal
export function handleFileSelect(event) {
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
  // console.log("fichier accepter", this.files);

  // stock le fichier
  const file = this.files[0];
  // créer une instance
  const file_reader = new FileReader();
  // ajoute à l'instance le fichier convertit en URL
  file_reader.readAsDataURL(file);
  // ajout d'un gestionnaire d'évenement au fichier
  file_reader.addEventListener("load", (event) => {
    // appel la fonction qui ajoute l'image
    displayImage(event, file);
  });
}

// fonction qui ajoute l'image dans la div "image-content"
function displayImage(event, file) {
  // récupère la div qui contient la nouvelle image et l'input "file"
  const imageContentDiv = document.getElementById("image-content");

  // vérifie si la div contient déjà une image et un input
  const existingImage = imageContentDiv.querySelector("img");
  const existingInput = imageContentDiv.querySelector("input[type=file]");
  if (existingImage || existingInput) {
    existingImage.src = event.target.result;
    existingImage.alt = file.name;
    existingInput.remove();
  } else {
    const image = document.createElement("img");
    // console.log(file.name);
    image.classList.add("img-onload");
    image.setAttribute("alt", file.name);
    image.src = event.target.result;
    // ajoute au DOM du parent "imageContentDiv" l'image
    imageContentDiv.appendChild(image);
  }

  // masque la div "add-photo" et affiche la div "img-content"
  const addPhotoDiv = document.getElementById("add-photo");
  addPhotoDiv.style.display = "none";
  imageContentDiv.style.display = "flex";
  // console.log(" Div 'add-photo' désactiver, Activation de la Div 'image-content'");

  // ajouter un input pour permettre à l'utilisateur de rechoisir une image
  const input_reload_image = document.createElement("input");
  input_reload_image.classList.add("hidden-input");
  input_reload_image.type = "file";
  input_reload_image.accept = "image/jpeg, image/png";
  // ajoute au DOM du parent
  imageContentDiv.appendChild(input_reload_image);
  input_reload_image.addEventListener("change", handleFileSelect);
}

/********* Envoie Formulaire à l'appuie du bouton "VALIDER" à l'API POST WORK************** */

// ajoute un gestionnaire d'écoute au formulaire qui est valider par l'input "Valider"
export function addListenerForm() {
  const form = document.querySelector(".add-photo_form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    handleValidationButtonClick();
  });
}

// fonction qui valide le formulaire et envoie une requête à l'API /works
export async function handleValidationButtonClick() {
  const form = document.querySelector(".add-photo_form");
  console.log(form);

  // // récupère le token
  const token = localStorage.getItem("token");
  // console.log(token);

  const formData = new FormData(form);

  const requestOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: formData,
  };
  fetch("http://localhost:5678/api/works", requestOptions)
  .then((response)=> response.json())
  .then((data) => console.log(data));

}

// fonction pour extraire le base64 de l'image
function extractBase64String() {
  const imageElement = document.querySelector("#image-content img");

  if (imageElement) {
    const base64String = imageElement.src.split(",")[1];
    console.log(base64String);
    return base64String;
  } else {
    console.log("aucune image à traiter");
  }
}

// fonction qui récupère la valeur saisie dans l'input "titre" du formulaire
function getTitleInputValue() {
  return document.querySelector("#title").value;
}

// fonction qui récupère la valeur saisie dans l'input "categories" du formulaire
function getCategoryInputValue() {
  return document.querySelector("#category").value;
}

// fonction qui renvoie à l'objet FormData avec les données récupérer
function createFormData(base64String, titleInput, categoryId) {
  // créer l'objet FormData
  const formData = new FormData();
  // ajoute les données récupérer pour chaques points de l'objet
  formData.append("image", base64String);
  formData.append("title", titleInput);
  formData.append("category", categoryId);
  console.log(formData);
  return formData;
}

// fonction asynchrone composé du corp de la requête
async function sendRequest(formData, token) {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }
  return response.json();
}

// fonction qui gère la réponse de l'API en fonction du statut de la réponse
function handleResponse(response) {
  if (response.status === 201) {
    console.log("travail créé avec succès");
    return response;
  } else if (response.status === 400) {
    console.error("requête incorrect. Vérifier données.");
    throw new Error("requête incorrect.");
  } else if (response.status === 401) {
    console.error("vous n'êtes pas autorisé. veuillez nous contacter");
  } else {
    throw new Error("erreur lors de la création du travail.");
  }
}

// fonction qui gère les erreurs rencontrées lors de la requête et affiche un message
function handleError(error) {
  console.error("erreur lors de la création du travail");
  // throw new Error("erreur lors de la création du travail.");
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
