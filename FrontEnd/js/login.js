// Fonction qui créer les éléments du header Login
function createHeader() {
  // Récupère le header
  const headerLogin = document.querySelector("header");

  // Ajoute les élément au header
  headerLogin.innerHTML = `
      <h1>Sophie Bluel <span>Architecte d'intérieur</span></h1>
      <nav>
          <ul>
           <li><a href="../index.html">projets</a></li>
           <li><a href="../index.html">contact</a></li>
           <li><a href="login.html">login</a></li>
           <li><img src="../assets/icons/instagram.png" alt="Instagram" /></li>          </ul>
      </nav>
  `;
}

// Fonction qui ajoute un écouteur d'évenement au formulaire
function addFormEventListener() {
  // Récupère l'élément formulaire
  const form = document.querySelector("form");

  // Ajout un écouteur d'évènement au formulaire
  // Et fait appel à la fonction "manageSubmissionForm" qui va gérer la soumission du formulaire
  form.addEventListener("submit", manageSubmissionForm);
}

// Fonction qui va gérer la soumission du formulaire en lui passant en paramètre l'évènement
function manageSubmissionForm(event) {
  // Empêche le comportement par défaut du navigateur
  event.preventDefault();
  // Récupère les valeurs saisie par le user pour l'email et le mot de passe
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Effectue une requête POST vers l'API POST users/login
  fetch("http://localhost:5678/api/users/login", {
    // Spécifie la méthode de la requête (POST)
    method: "POST",
    // Indique le type de media du corps de la requête (JSON)
    headers: {
      "Content-Type": "application/json",
    },
    // Convertit les données en JSON et les envoie dans le corps de la requête
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    // Traite la réponse de l'API après vérification des données d'authentification
    .then(manageResponseAPI)

    // Gestion des erreurs d'authentification :
    .catch(handleError);
}

// Fonction asynchrone qui traite la réponse de l'API
async function manageResponseAPI(response) {
  if (response.ok) {
    // Si la réponse est ok, les données convertit en JSON seront stocké dans une variable "data"
    const data = await response.json();
    // Enregistre le token dans le localStorage
    localStorage.setItem(`token`, data.token);
    // Redirige vers la page index.html "Mode Edition"
    window.location.href = "../index.html";
  } else {
    // Sinon si c'est pas ok, récupération du message d'erreur de l'API au format JSON
    const errorData = await response.json();
    // Message d'erreur
    console.error(errorData);
    // Lance une erreur avec le message d'erreur de l'API
    throw new Error(errorData.message);
  }
}

// Fonction pour traiter les messages erreurs de l'API 
function handleError(error) {
  // Récupère le message d'erreur si il existe
  const existingErrorMessage = document.querySelector("p");

  if (existingErrorMessage) {
    // Si il existe déjà retire le message existant
    existingErrorMessage.remove();
  }

  // Crée l'élément qui va afficher le message d"erreur
  const errorMessage = document.createElement("p");

  if (error.message === "user not found") {
    // Si le message d'erreur de l'API est égale à "user not found" alors affiche le message de l'erreur
    errorMessage.textContent = error.message;
  } else {
    // Sinon affiche ce message
    errorMessage.textContent = "Invalid password. Please try again";
  }

  // Récupère l'élément "form"
  const loginSection = document.getElementById("login");
  // Insert le message d'erreur avant l'élément "formulaire"
  loginSection.insertBefore(errorMessage, loginSection.querySelector("form"));
  // Affiche le message d'erreur rencontrer
  console.log("Erreur message API", errorMessage);

  // Si il y a un message d'erreur
  if (errorMessage) {
    // Modifie la marge "Top" du formulaire
    const form = document.querySelector("form");
    form.style.marginTop = "0";
  }
}

// Fonction qui créer le footer
function createFooter() {
  // Récupère le body et le footer
  const loginBody = document.body;
  const footerLogin = document.querySelector("footer");
  // Injecte ces éléments dans le DOM du footer
  footerLogin.innerHTML = `
        <nav>
        <ul>
        <li>Mentions Légales</li>
        </ul>
        </nav>
    `;
  // Manipule le DOM pour que le footer soit enfant du body
  loginBody.appendChild(footerLogin);
}

// fonction d'initialisation
function init() {
  // appel des fonctions qui :

  // Créer le header
  createHeader();
  // Ajoute un gestionnaire d'écoute au formulaire
  addFormEventListener();
  // Crée le footer
  createFooter();
}

// Appel de la fonction d'initialisation
init();
