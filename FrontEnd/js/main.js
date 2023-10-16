// api.js
import { fetchWorks, fetchCategory, categoryFilter } from "./api.js";
// ui.js
import {
  createFigure,
  createButtonFilter,
  addEventListenerButtonFilter,
} from "./ui.js";
// auth.js
import {
  checkAuthentification,
  barModeEdition,
  addSvgAncre,
  logoutUser,
} from "./auth.js";
// modal.js
import {
  addEventListenerModalDelete,
  displayImageInModal,
  handleDeleteImage,
  btnAddPhotoListener,
  svgBackListener,
  btnAddPhoto,
  handleFileSelect,
  closeModalOnOutsideClik,
  closeModalOnClickSvgCross,
} from "./modal.js";

// Variable globale récupérant les travaux de l'API works
let worksFetch;

// // function check l'authentification si true(grâce au token récupérer dans le localStorage)
// // alors actualise la page Mode Edition
// function checkAuthentification() {
//   // récupère le token dans le localStorage
//   const token = localStorage.getItem(`token`);
//   // test
//   // console.log("j'ai récupérer le token :", token);

//   // Si user authentifier authentifieé
//   if (token) {
//     // appel de la fonction qui ajoute la barre Mode Edition
//     barModeEdition();
//     // appel de la fonction qui fait disparaitre les boutons
//     disappearBntFilterDisplay();
//     // appel de la fonction qui ajoute une ancre et le bouton modifier
//     addSvgAncre();
//     // appel de la fonction qui redirige vers la home page non modifier "home-page"
//     // et qui supprime le token du LocalStorage pour déconnecter
//     logoutUser();
//   }
// }

// // function qui créer la barre Mode Edition
// function barModeEdition() {
//   // créer la barre Mode édition
//   const barModeEdition = document.createElement("div");
//   barModeEdition.classList.add("bar-mode-edition");
//   barModeEdition.innerHTML = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
//         <path d="M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z" fill="white"/>
//       </svg>
//       <p class="mode-edition">Mode édition</p>
//     `;

//   // récupère le header
//   const header = document.querySelector("header");
//   // insert la barModeEdition avant le header
//   document.body.insertBefore(barModeEdition, header);
// }

// // function check l'autification si oui ont fait disparaitre les btnFilters
// function disappearBntFilterDisplay() {
//   // récupère la div filter
//   const filterDiv = document.querySelector(".filter");
//   // désactive les boutons
//   filterDiv.style.display = "none";
// }

// // function ajoute le svg + le boutton modifier si login
// function addSvgAncre() {
//   // Créer le SVG
//   const editSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//   editSvg.setAttribute("width", "16");
//   editSvg.setAttribute("height", "16");
//   editSvg.setAttribute("viewBox", "0 0 16 16");
//   editSvg.setAttribute("fill", "none");
//   editSvg.innerHTML = `
//       <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
//     `;
//   editSvg.classList.add("edit-svg");

//   // Créer le boutton modifier
//   const editLinkModify = document.createElement("button");
//   editLinkModify.setAttribute("href", "#modal1");
//   editLinkModify.innerText = "modifier";
//   editLinkModify.classList.add("link-modifier");
//   // ajout d'un gestionnaire d'écoute évenement lors du click sur l'élément
//   // récupère le titre H2 de lasection portfolio
//   const h2Title = document.querySelector("#portfolio h2");
//   h2Title.classList.add("modify-h2");
//   // ajoute a côté du h2
//   h2Title.appendChild(editSvg);
//   h2Title.appendChild(editLinkModify);

//   // appel de la fonction qui ajoute un gestionnaire d'évènement au click sur le boutton pour ouvrir le modal1
//   addEventListenerModalDelete();
// }

// // function qui déconnecte en cliquant sur logout
// function logoutUser() {
//   // récupère l'ancre login
//   const linkLogin = document.querySelector(".login-link");
//   // change le texte
//   linkLogin.textContent = "logout";
//   // modifie le href de l'ancre pour
//   linkLogin.href = "./index.html";
//   // ajoute un gestionnaire d'évenement
//   linkLogin.addEventListener("click", (event) => {
//     // suprime le token
//     localStorage.removeItem("token");
//     // controle
//     console.log("Supprime le token");
//   });
//   // controle du lien logout
//   // console.log(linkLogin);
// }

// // fonction ajoute un gestionnaire d'écoute évenement au boutton "Modifier" pour ouvrir le modale1
// function addEventListenerModalDelete() {
//   // récupère le boutton "modifier"
//   const btnModify = document.querySelector(".link-modifier");
//   // console.log(btnModify);

//   if (btnModify) {
//     // ajout un gestionnaire d'écoute à l'évenement au "click"
//     btnModify.addEventListener("click", (event) => {
//       event.preventDefault();
//       // récupérer le modal
//       const asideModalDelete = document.getElementById("modal1");
//       asideModalDelete.setAttribute("aria-modal", "true");

//       // ajoute le style pour rendre visible le modal DELETE
//       asideModalDelete.style.display = "flex";
//       // sauvegarde la boite modal
//       modal = asideModalDelete;
//       // controle
//       // console.log("aside modal Delete est activé et enregistrer", modal);
//     });
//   }
// }

// // fonction pour afficher les images et le svg dans le modal DELETE
// function displayImageInModal() {
//   // récupère la div figure-modal1
//   const imagesModal1Div = document.querySelector(".cta-img-svg");

//   // console.log(imagesModal1Div);
//   // parcourir les données de l'API works
//   // pour chaque élément de l'API
//   worksFetch.forEach((work) => {
//     // créer un container pour recevoir l'image et le svg
//     const container = document.createElement("div");
//     container.classList.add("cta-img-svg_content");
//     // Ajout d'un ID unique à chaque containeur
//     container.dataset.id = work.id;
//     // console.log("ajout id sur container",container.dataset.id);
//     // créer un élément img
//     const imgModal1 = document.createElement("img");
//     // ajoute une class pour le style
//     imgModal1.classList.add("image-modal1");
//     // définie la source de l'image en récupèrant l'URL de l'image dans l'API works
//     imgModal1.src = work.imageUrl;

//     // créer l'élément SVG
//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("width", "9");
//     svg.setAttribute("height", "11");
//     svg.setAttribute("viewBox", "0 0 9 11");
//     svg.setAttribute("fill", "none");
//     svg.innerHTML = `
//       <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
//     `;
//     svg.classList.add("svg-modal1");
//     // ajout d'un id a chaque svg
//     svg.dataset.id = work.id;
//     // console.log("ajout id du svg",svg.dataset.id);

//     // ajout d'un gestionnaire d'évenement au click sur le svg (corbeille)
//     // et appel la fonction qui exécuteras la suppression au click
//     svg.addEventListener("click", handleDeleteImage);

//     // image et le svg enfant du container et le container enfant de la div "imagesModal1Div"
//     container.appendChild(imgModal1);
//     container.appendChild(svg);
//     imagesModal1Div.appendChild(container);
//   });
// }

// // fonction supprime l'image du Modal DELETE
// async function handleDeleteImage(event) {
//   event.preventDefault();
//   // rècupère l'ID de l'image à supprimer à partir du dataset du SVG cliké
//   const imageId = event.currentTarget.dataset.id;
//   console.log("je supprime le svg", imageId);

//   // simulation de suppression
//   const response = { status: 200, message: "Image supprimer" };

//   // // gérer la réponse de la simulation
//   // if (response.status === 200) {
//   //   console.log(response.message);
//   //   const ctaImgSvg = event.currentTarget.parentNode;
//   //   ctaImgSvg.remove();
//   // } else {
//   //   console.log("la suppression de l'image à echoué");
//   // }

//   // Verifie si l'ID de l'image existe bien dans la base de donnée
//   if (
//     imageId !== undefined &&
//     Number.isInteger(parseInt(imageId)) &&
//     parseInt(imageId) > 0
//   ) {
//     // récupère le token dans le Local Storage
//     const token = localStorage.getItem("token");

//     // si le token est dans le local storage
//     if (token && token.trim() !== "") {
//       // tente d'envoyez une requête DELETE auprès de l'API pour supprimer l'image
//       try {
//         // envoie la requête DELETE vers l'API pour supprimer l'image avec l'ID spécifié
//         const response = await fetch(
//           `http://localhost:5678/api/works/${imageId}`,
//           {
//             // utilise la méthode DELETE pour la suppression
//             method: "DELETE",
//             // ajoute les en-têtes, y compris le type de contenu et le token d'authentification
//             headers: {
//               "Content-Type": `application/json`, //type de contenu en JSON
//               /***********
//                * - ajoute le token au header
//                * - Authorization pour inclure le jeton("Bearer") et le token (authentifier)
//                ***********  */
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         // gestion de la réponse provenant de l'API
//         if (response.ok) {
//           // controle
//           console.log("image supprimée ok !!!");

//           // supprime le container et le svg
//           const containerImgSvg = event.currentTarget.parentNode;
//           containerImgSvg.remove();
//         } else {
//           console.log("la suppression à echouer");
//         }
//       } catch (error) {
//         console.log("erreur lors de la suppression de l'image", error);
//       }
//     } else {
//       console.log("token d'authentification invalide");
//     }
//   } else {
//     console.log("l'ID de l'image invalide");
//   }
// }

// // fonction qui ajoute un gestionnaire d'évenement au bouton "Ajouter une image"
// function btnAddPhotoListener() {
//   // récupérer le bouton "Ajouter une image"
//   const btnAddPhoto = document.querySelector(".add-photo-modal1");

//   // ajoute le gestionnaire d'écoute au click sur le bouton
//   btnAddPhoto.addEventListener("click", (event) => {
//     // console.log("j'entend le bouton add photo");

//     // récupère la div Modal Delete
//     const modalDelete = document.querySelector(".modal-wrapper");
//     // console.log("ont rend invisible la div : ", modalDelete);
//     // ont fait disparaitre la div
//     modalDelete.style.display = "none";

//     // récupère la div Modal qui va ajouter une phot
//     const modalAddPhoto = document.querySelector(".modal_add-photo");
//     // console.log("Ont rend visible la div : ", modalAddPhoto);
//     // ont fait apparaître le modal Add photo
//     modalAddPhoto.style.display = "flex";
//   });
// }

// // fonction qui ajoute un gestionnaire d'évenement au SVG back
// function svgBackListener() {
//   // récupère le svg back
//   const svgBack = document.querySelector(".back-delete");
//   // console.log(svgBack);
//   svgBack.addEventListener("click", (event) => {
//     console.log("j'écoute le svg Back");
//     // récupère la div
//     // récupère la div Modal Delete
//     const modalDelete = document.querySelector(".modal-wrapper");
//     console.log("ont rend invisible la div : ", modalDelete);
//     // ont fait disparaitre la div
//     modalDelete.style.display = "flex";

//     // récupère la div Modal qui va ajouter une phot
//     const modalAddPhoto = document.querySelector(".modal_add-photo");
//     console.log("Ont rend visible la div : ", modalAddPhoto);
//     // ont fait apparaître le modal Add photo
//     modalAddPhoto.style.display = "none";
//   });
// }

// // fontion ajout photo lors du clic sur le bouton "+ Ajout Photo"
// function btnAddPhoto() {
//   // récupère le bouton "+ Ajout Photo"
//   const btnAddPhoto = document.getElementById("add-photo_btn");

//   btnAddPhoto.addEventListener("click", (event) => {
//     console.log("j'écoute le bouton :", btnAddPhoto);

//     // test avec image en dure
//     // handleFileSelect();

//     // ouvre une boite de dialogue pour selectionner le fichier photo
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/jpeg, image/png";
//     input.click();
//     // ajoute une gestionnaire d'écoute au changement pour verifier le format d'image et la taille
//     input.addEventListener("change", handleFileSelect);
//   });
// }

// // fonction qui charge la photo et vérifie le format et la taille puis l'affiche dans le modal
// function handleFileSelect(event) {
//   // récupère le fichier à partir de l'évenement
//   const file = event.target.files[0];

//   if (file) {
//     // vérifie le format de la photo
//     if (file.type.match("image/jpeg") || file.type.match("image/png")) {
//       // vérifie la taille 4Mo en octets
//       if (file.size <= 4 * 1024 * 1024) {
//         console.log("photo ok pour format et taille");

//         // créer un objet URL à partir du fichier saisie
//         const imgUrl = URL.createObjectURL(file);
//         console.log("imageURL charger avec succès");

//         // Crée un élément image
//         const img = document.createElement("img");
//         img.classList.add("img-onload");

//         // définie l'URL de l'image en tant que source de l'élément img
//         img.src = imgUrl;
//         console.log("imageUrl définie comme source pour l'élément <img>");

//         // affiche l'image dans la div "image-content"
//         const imageContentDiv = document.getElementById("image-content");
//         imageContentDiv.appendChild(img);
//         console.log(
//           "image afficher et positionner dans la Div 'image-content'"
//         );

//         // masque la div "add-photo" et affiche la div "img-content"
//         const addPhotoDiv = document.getElementById("add-photo");
//         addPhotoDiv.style.display = "none";
//         imageContentDiv.style.display = "flex";
//         console.log(
//           " Div 'add-photo' désactiver, Activation de la Div 'image-content'"
//         );
//       } else {
//         alert("photo trop grande. Taille maximale 4Mo");
//       }
//     } else {
//       alert(
//         "format de fichier non pris en charge. Veuillez sélectionner une photo au format JPEG ou PNG."
//       );
//     }
//   } else {
//     alert("image pas charger");
//   }
// }

// // fonction pour fermer le modal au click sur l'extèrieur du modal (partie grisé)
// function closeModalOnOutsideClik() {
//   // ferme le modal lorsque l'utilisateur click à l'extèrieur du contenu du modal
//   const aside = document.querySelector(".modal");
//   aside.addEventListener("click", (event) => {
//     // Si le click de la souris est entendu sur le parent (et non les enfants) donc la partie grisé alors
//     if (event.target === aside) {
//       // masque le modal en changeant le style de display à "none"
//       aside.style.display = "none";
//       modal = "null";
//       console.log("entendu clic sur la partie grisé fermeture du modal");
//     }
//   });
// }

// // fonction qui ferme le modal en cliquant sur le svg croix
// function closeModalOnClickSvgCross() {
//   // récupère le svg en question
//   const aside = document.querySelector(".modal");

//   // récupère le svg en question
//   const closeBtns = document.querySelectorAll(".close-modal");
//   // console.log(closeBtns);

//   closeBtns.forEach((closeBtn) => {
//     // ajoute un gestionnaire d'évenement au svg
//     closeBtn.addEventListener("click", () => {
//       // puis ont ferme le modale
//       aside.style.display = "none";
//       modal = "null";
//       console.log("écoute clik sur le SVG cross fermeture du modal");
//     });
//   });
// }

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
  worksFetch = await fetchWorks();
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

  //  écoute le bouton "+ Ajout photo"
  //btnAddPhoto();

  // ferme le modal lors du clik sur la partie grisé
  closeModalOnOutsideClik();
  // ferme le modal lors du clik sur le SVG cross
  closeModalOnClickSvgCross();

  // envoie les données du formulaire
  sendWorks();

  // déconnecte lors de la fermeture de la page du navigateur
  // disconnectClosingWindow();
}

// appel de la fonction d'initialisation au chargement de la page
init();

function sendWorks() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    };
    fetch("http://localhost:5678/api/works", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
}
