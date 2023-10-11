import { addEventListenerModalDelete } from "./modal.js";

// function check l'authentification si true(grâce au token récupérer dans le localStorage)
// alors actualise la page Mode Edition
export function checkAuthentification() {
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
export function barModeEdition() {
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

// function ajoute le svg + le boutton modifier si login
export function addSvgAncre() {
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
export function logoutUser() {
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
