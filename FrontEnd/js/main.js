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
    btnFilter.classList.add("btn-filter");
    // ajoute le nom de la catégories respective au bouton filtre provenant du tableau "categoryFetch"
    btnFilter.innerHTML = category.name;
    // ajoute un écouteur d'évènement
    addventListenerButtonFilter(worksFetch, category, btnFilter);
    // ajoute le bouton filtre à la div filter
    filterDiv.appendChild(btnFilter);
    // test
    // console.log(categoryFetch);
  });
}

// function pour ajouter un écouteur d'évenement sur les btnFilter
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

// function check l'authentification si true(grâce au token récupérer dans le localStorage)
// alors on créer la barre Mode édition
function checkAuthentification() {
  // récupère le token dans le localStorage
  const token = localStorage.getItem(`token`);
  // test
  // console.log("j'ai récupérer le token :", token);

  // Si user authentifier authentifieé
  if (token) {
    // appel de la fonction qui ajoute la barre Mode Edition
    barModeEdition();
    // appel de la fonction qui fait disparaitre les boutons
    disappearBntFilterDisplay();
    // appel de la fonction qui ajoute une ancre et le bouton modifier
    addSvgAncre();
    // appel de la fonction qui redirige vers la home page non modifier "home-page"
    // et qui supprime le token du LocalStorage pour déconnecter
    logoutUser();
  }
}

// function qui créer la barre Mode Edition
function barModeEdition() {
  // créer la barre Mode édition
  const barModeEdition = document.createElement("div");
  barModeEdition.classList.add("bar-mode-edition");
  barModeEdition.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z" fill="white"/>
      </svg>
      <p class="mode-edition">Mode édition</p>
    `;

  // récupère le header
  const header = document.querySelector("header");
  // insert la barModeEdition avant le header
  document.body.insertBefore(barModeEdition, header);
}

// function check l'autification si oui ont fait disparaitre les btnFilters
function disappearBntFilterDisplay() {
  // récupère la div filter
  const filterDiv = document.querySelector(".filter");
  // désactive les boutons
  filterDiv.style.display = "none";
}

// function ajoute le svg + le boutton modifier
function addSvgAncre() {
  // Créer le SVG
  const editSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  editSvg.setAttribute("width", "16");
  editSvg.setAttribute("height", "16");
  editSvg.setAttribute("viewBox", "0 0 16 16");
  editSvg.setAttribute("fill", "none");
  editSvg.innerHTML = `
      <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>    
    `;
  editSvg.classList.add("edit-svg");

  // Créer le boutton modifier
  const editLinkModify = document.createElement("button");
  editLinkModify.setAttribute("href", "#modal1");
  editLinkModify.innerText = "modifier";
  editLinkModify.classList.add("link-modifier");
  // ajout d'un gestionnaire d'écoute évenement lors du click sur l'élément
  // récupère le titre H2 de lasection portfolio
  const h2Title = document.querySelector("#portfolio h2");
  h2Title.classList.add("modify-h2");
  // ajoute a côté du h2
  h2Title.appendChild(editSvg);
  h2Title.appendChild(editLinkModify);

  // appel de la fonction qui ajoute un gestionnaire d'évènement au click sur le boutton pour ouvrir le modal1
  addEventListenerModalDelete();
}

// function qui déconnecte en cliquant sur logout
function logoutUser() {
  // récupère l'ancre login
  const linkLogin = document.querySelector(".login-link");
  // change le texte
  linkLogin.textContent = "logout";
  // modifie le href de l'ancre pour
  linkLogin.href = "./index.html";
  // ajoute un gestionnaire d'évenement
  linkLogin.addEventListener("click", (event) => {
    // suprime le token
    localStorage.removeItem("token");
    // controle
    console.log("Supprime le token");
  });
  // controle du lien logout
  // console.log(linkLogin);
}

// varialble qui permet de savoir quel modal est ouvert
let modal;
// fonction ajoute un gestionnaire d'écoute évenement au boutton "Modifier" pour ouvrir le modale1
function addEventListenerModalDelete() {
  // récupère le boutton "modifier"
  const btnModify = document.querySelector(".link-modifier");
  // console.log(btnModify);

  if (btnModify) {

    // ajout un gestionnaire d'écoute à l'évenement au "click"
    btnModify.addEventListener("click", (event) => {
      event.preventDefault();
      // récupérer le modal
      const target = document.getElementById("modal1");
      target.setAttribute("aria-modal", "true");

      // ajoute le style pour être visible
      target.style.display = "flex";
      // sauvegarde la boite modal
      modal = target;
      // controle
      // console.log("le modal Delete est activé et enregistrer", modal);
    });
  }
}

// fonction qui ferme la fenêtre (aside) contenant le Modale Delete
function createModalDelete() {
  // récupère le aside modal
  const asideModalDelete = document.querySelector(".modal-wrapper");
  // console.log(asideModalDelete);
  // asideModalDelete.innerHTML = `      
  //   <h2 id="titlemodal">Galerie photo</h2>
  //   <svg class ="close-modal1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  //     <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
  //   </svg>
  //   <div class ="cta-img-svg"></div>
  //   <button id = "titlemodal2" class = "btn add-photo-modal1"> Ajouter une photo </button>
  // `;

  modal = asideModalDelete;
  // console.log("Enregistre dans la variable global le modal = ", modal);

  // ferme le modal lorsque l'utilisateur click à l'extèrieur du contenu du modal
  const aside = document.querySelector(".modal");
  aside.addEventListener("click", (event) => {
    // Si le click de la souris est entendu sur le parent (et non les enfants) donc la partie grisé alors
    if (event.target === aside) {
      // masque le modal en changeant le style de display à "none"
      aside.style.display = "none";
      modal = "null";
      console.log("modal DELETE fermer");
    }
  });

  // ferme le modal1 avec le svg
  // récupère le svg en question
  const closeBtn = document.querySelector(".close-modal1");
  // ajoute un gestionnaire d'évenement au svg
  closeBtn.addEventListener("click", () => {
    // puis ont ferme le modale
    aside.style.display = "none";
    modal = "null";
    console.log("modal DELETE fermer");
  });
}

// fonction qui initialise le Modal Delete à son état
function initializeModalDelete(){

  // // appel de la fonction createModalDelete pour initialisé le modal DELETE
  createModalDelete();
}

// fonction pour afficher les images et le svg dans le modal
function displayImageInModal() {
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

// fonction supprime l'image
async function handleDeleteImage(event) {
  // rècupère l'ID de l'image à supprimer à partir du dataset du SVG cliké
  const imageId = event.currentTarget.dataset.id;
  console.log("je supprime le svg", imageId);

  // simulation de suppression
  const response = { status: 200, message: "Image supprimer" };

  // gérer la réponse de la simulation
  if (response.status === 200) {
    console.log(response.message);
    const ctaImgSvg = event.currentTarget.parentNode;
    ctaImgSvg.remove();
  } else {
    console.log("la suppression de l'image à echoué");
  }

  //Verifie si l'ID de l'image existe bien dans la base de donnée
  // if (
  //   imageId !== undefined &&
  //   Number.isInteger(parseInt(imageId)) &&
  //   parseInt(imageId) > 0
  // ) {
  //   // récupère le token dans le Local Storage
  //   const token = localStorage.getItem("token");

  //   // si le token est dans le local storage
  //   if (token && token.trim() !== "") {
  //     // tente d'envoyez une requête DELETE auprès de l'API pour supprimer l'image
  //     try {
  //       // envoie la requête DELETE vers l'API pour supprimer l'image avec l'ID spécifié
  //       const response = await fetch(
  //         `http://localhost:5678/api/works/${imageId}`,
  //         {
  //           // utilise la méthode DELETE pour la suppression
  //           method: "DELETE",
  //           // ajoute les en-têtes, y compris le type de contenu et le token d'authentification
  //           headers: {
  //             "Content-Type": `application/json`, //type de contenu en JSON
  //             /***********
  //              * - ajoute le token au header
  //              * - Authorization pour inclure le jeton("Bearer") et le token (authentifier)
  //              ***********  */
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // gestion de la réponse provenant de l'API
  //       if (response.ok) {
  //         // controle
  //         console.log("image supprimée ok !!!");

  //         // supprime le container et le svg
  //         const containerImgSvg = event.currentTarget.parentNode;
  //         containerImgSvg.remove();
  //       } else {
  //         console.log("la suppression à echouer");
  //       }
  //     } catch (error) {
  //       console.log("erreur lors de la suppression de l'image", error);
  //     }
  //   } else {
  //     console.log("token d'authentification invalide");
  //   }
  // } else {
  //   console.log("l'ID de l'image invalide");
  // }
}

// fonction qui ajoute un gestionnaire d'évenement au bouton "Ajouter une image"
function btnAddPhotoListener(){

  // récupérer le bouton "Ajouter une image"
  const btnAddPhoto = document.querySelector(".add-photo-modal1");
  // ajoute le gestionnaire d'écoute au click sur le bouton
  btnAddPhoto.addEventListener("click", (event) => {
    console.log("j'entend le bouton add photo");

    // récupère la div Modal Delete
    const modalDelete = document.querySelector(".modal-wrapper");
    console.log("ont rend invisible la div : ",modalDelete);
    // ont fait disparaitre la div 
    modalDelete.style.display = "none";

    // récupère la div Modal qui va ajouter une phot
    const modalAddPhoto = document.querySelector(".modal_add-photo");
    console.log("Ont rend visible la div : ",modalAddPhoto);
    modalAddPhoto.style.display = "flex";


  })

}

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

  // **********appelle la fonction qui

  // créer l'élément figure
  createFigure(worksFetch);
  // filtre par catégories
  categoryFilter(worksFetch);
  // crée les boutons filtre
  createButtonFilter(categoryFetch);
  // test après être authentifier
  checkAuthentification();

  // création du modale1
  createModalDelete();
  // ajouter les images dans la div figure-modal1 du modal1
  displayImageInModal();

  // écoute le bouton "Ajouter une photo"
  btnAddPhotoListener();
  // ajouter une image grâce au bouton "Ajouter une image"
  // addImage();
  // setupAddPhotoEventListeners();

  // déconnecte lors de la fermeture de la page du navigateur
  // disconnectClosingWindow();
}

// appel de la fonction d'initialisation au chargement de la page
init();
