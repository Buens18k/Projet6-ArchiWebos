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
  if (
    imageId !== undefined &&
    Number.isInteger(parseInt(imageId)) &&
    parseInt(imageId) > 0
  ) {
    // récupère le token dans le Local Storage
    const token = localStorage.getItem("token");

    // si le token est dans le local storage
    if (token && token.trim() !== "") {
      // tente d'envoyez une requête DELETE auprès de l'API pour supprimer l'image
      try {
        // envoie la requête DELETE vers l'API pour supprimer l'image avec l'ID spécifié
        const response = await fetch(
          `http://localhost:5678/api/works/${imageId}`,
          {
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
          }
        );
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

/********* Ajout photo dans le Modal "Ajoute photo" ************** */

// fontion ajout photo lors du clic sur l'input "+ Ajout Photo"
export function btnAddPhoto() {
  // récupère le l'input "+ Ajout Photo"
  const btnAddPhoto = document.getElementById("add-photo_btn");

  btnAddPhoto.addEventListener("click", (event) => {
    // console.log("j'écoute le bouton :", btnAddPhoto);

    // ouvre une boite de dialogue pour selectionner le fichier photo
    const input = document.createElement("input");
    input.type = "file";
    input.classList.add("hidden-input");
    input.accept = "image/jpeg, image/png";
    // ajoute une gestionnaire d'écoute au changement pour verifier le format d'image et la taille
    input.addEventListener("change", handleFileSelect);
    const imageContentDiv = document.getElementById("image-content");
    imageContentDiv.appendChild(input);
    // ouvre la boite de dialogue pour sélectionner le fichier
    input.click();
  });
}

// fonction qui vérifie le format de la photo à charger
function isPhotoValid(file) {
  return file.type.match("image/jpeg") || file.type.match("image/png");
}

// fonction qui vérifiela taille de la photo à charger
function isPhotoSizeValid(file) {
  return file.size <= 4 * 1024 * 1024;
}

// fonction qui créer la photo au format URL pour placer dans la balise "<img>"
function createPhotoElement(url) {
  const img = document.createElement("img");
  img.classList.add("img-onload");
  img.src = url;
  return img;
}

// fonction qui charge la photo et vérifie le format et la taille puis l'affiche dans le modal
export function handleFileSelect(event) {
  // récupère le fichier à partir de l'évenement
  const file = event.target.files[0];

  if (file) {
    // vérifie le format et la taille de la photo à charger
    if (isPhotoValid(file) && isPhotoSizeValid(file)) {
      // créer une URL de la photo charger
      const selectImgURL = URL.createObjectURL(file);
      console.log("URL de la photo charger :", selectImgURL);

      // récupère la div qui contient la nouvelle image et l'input "file"
      const imageContentDiv = document.getElementById("image-content");

      // récupère l'ancienne image si elle existe
      const oldImage = document.querySelector("#image-content img");
      // Si c'est l'ancienne image
      if (oldImage) {
        // supprime l'image de la div
        imageContentDiv.removeChild(oldImage);
        console.log("Supprime l'ancienne image charger");
      }

      // Créer la photo
      const img = createPhotoElement(selectImgURL);
      imageContentDiv.appendChild(img);
      // console.log("image afficher et positionner dans la Div 'image-content'");

      // masque la div "add-photo" et affiche la div "img-content"
      const addPhotoDiv = document.getElementById("add-photo");
      addPhotoDiv.style.display = "none";
      imageContentDiv.style.display = "flex";
      // console.log(
      //   " Div 'add-photo' désactiver, Activation de la Div 'image-content'"
      // );
    } else if (!isPhotoValid(file)) {
      alert(
        "Format de fichier non pris en charge. Veuillez sélectionner une photo au format JPEG ou PNG."
      );
    } else {
      alert("Taille maximale accepter 4Mo.");
    }
  } else {
    alert("Pas d'image sélectionnée.");
  }
}

/********* Envoie Formulaire à l'apûie du bouton "VALIDER" à l'API POST WORK************** */

// ajoute un gestionnaire d'écoute au bouton "Valider"
export function addListenerForm() {
  const form = document.querySelector(".add-photo_form");
  // console.log("j'écoute le :",form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    handleValidationButtonClick();
  });
}

// fonction pour récupérer l'ID de l'utilisateur dans le LocalStorage à partir du "token"
export async function getUserIdInLocalStorageFromToken() {
  // récupère le token
  const token = localStorage.getItem("token");
  // vérfie si le token est présent
  if (token) {
    // Divise le token en parties (en-tête, payload, signature) et récupère le payload (index1) convertit en JSON
    const payload = JSON.parse(atob(token.split(".")[1]));
    // console.log(payload);
    // renvoie l'userId de l'utilisateur du payload du token
    return payload.userId;
  } else {
    // Sinon si token existe pas ou expiré
    console.error("le token existe pas ou expiré");
    return null;
  }
}

export async function handleValidationButtonClick() {
  // récupère la valeur du champ saisie par l'utilisateur avec l'ID "title"
  const titleInput = document.getElementById("title").value;

  // récupère la valeur du champ saisie par l'utilisateur avec l'ID "category"
  const categoryInput = document.getElementById("category").value;
  // obtient l'ID de la catégories en utilisant la valeur de la catégorie saisie par l'utilisateur
  const categoryId = getCategoryId(categoryInput);

  // obtient le jeton d'utilisateur depuis le stockage local de manière asynchrone
  const userIdToken = await getUserIdInLocalStorageFromToken();
  // obtient un blob d'image à partir de l'URL de l'image sélectionnée par l'utilisateur
  const imageBlob = await getImageBlobFromUrl();

  // vérifie si tous les champs sont saisie par l'utilisateur
  if (!titleInput || !categoryId || !imageBlob) {
    console.error("Merci de remplir tout les champs du formulaires");
  } else {
    console.log("tout les champs du Formulaire sont rempli");
  }

  // créer un objet FormData en utilisant les données récupérées
  const formData = createFormData(
    titleInput,
    imageBlob,
    categoryId,
    userIdToken
  );

  try {
    // envoie une requête POST avec les données du formulaire à l'API
    const response = await sendRequest(formData);
    // gère la réponse de l'API
    handleResponse(response);
  } catch (error) {
    // gère les erreurs rencontrées lors de la requête
    handleError(error);
  }
}

// fonction asynchrone pour obtenir un blob d'image partir de l'URL de l'image selectionner par l'utilisateur
async function getImageBlobFromUrl() {
  // récupère l'URL de l'image à partir de l'élément d'image
  const imageElement = document.querySelector("#image-content img");
  // vérifie si l'élément d'image à été trouvé
  if (imageElement) {
    // obtient une URL à partir de l'élément d'image
    const imageURL = imageElement.src;
    // envoie une requête pour obtenir un blob de l'image à partir de l'URL
    const response = await fetch(imageURL);
    // obtient le blob de la réponse de la requête
    const blob = await response.blob();
    // crée une nouvelle promesse qui sera résolue avec la valeur retournée
    return new Promise((resolve) => {
      // ont crée un nouvel objet qui permet de lire les contenus des fichiers ou des blobs en tant qu'objets de données.
      const reader = new FileReader();
      // déclenché quant la lecture de fichier est terminer
      reader.onloadend = function () {
        // Crée un nouveau blob à partir des données ArrayBuffer lue par FileReader
        // les données sont ensuite passées à resolve, ce qui résout la promesse avec le nouveau blob
        resolve(new Blob([reader.result], { type: blob.type }));
      };
      // déclenche la lecture du contenu du blob en tant qu'ArrayBuffer, lorsque la lecture est terminer l'évènement "onloadend" est déclenché
      reader.readAsArrayBuffer(blob);
    });
  }
  // retourne "null" si auncun élément d'image n'a été trouver
  return null;
}

// fonction qui crée un objet FormData à partir des données fournies
function createFormData(title, imageBlob, categoryId, userId) {
  // créer un objet FormData
  const formData = new FormData();
  // ajoute les champs à l'objet FormData
  formData.append("title", title);
  formData.append("imageURL", imageBlob);
  formData.append("categoryId", categoryId);
  formData.append("userId", userId);
  return formData;
}

// fonction qui envoie une requête POST à l'API avec l'object FormData et retourne la réponse
async function sendRequest(formData) {
  return fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      accept: "application/json",
    },
  });
}

// fonction qui gère la réponse de l'API en fonction du statut de la réponse
function handleResponse(response) {
  if (response.status === 201) {
    console.log("travail créé avec succès");
    return response.json();
  } else if (response.status === 400) {
    console.error("requête incorrect. Vérifier données.");
    throw new Error("requête incorrect.");
  } else if (response.status === 401) {
    console.error("voun'êtes pas autorisé. veuillez nous contacter");
  } else {
    console.error("erreur lors de la création du travail");
    throw new Error("erreur lors de la création du travail.");
  }
}

// fonction qui gère les erreurs rencontrées lors de la requête et affiche un message
function handleError(error) {
  console.error("erreur lors de la création du travail");
  throw new Error("erreur lors de la création du travail.");
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
