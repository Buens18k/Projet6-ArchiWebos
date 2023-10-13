// Fonction qui créer les éléments du header Login
function createHeader() {
  // récupère le header
  const headerLogin = document.querySelector("header");
  // console.log(headerLogin);

  // ajooute les élément au header
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

// fonction qui ajoute un écouteur d'évenement au formulaire
function addFormEventListener() {
  // récupère l'élément formulaire
  const form = document.querySelector("form");
  console.log(form);

  // ajout un écouteur d'évènement au formulaire
  // et fait appel à la fonction qui va gérer la soumission du formulaire
  form.addEventListener("submit", manageSubmissionForm);
}

// // fonction qui va gérer la soumission du formulaire en lui passant en paramètre l'évènement
function manageSubmissionForm(event) {
  // Désactivation du comportement par défaut du navigateur
  event.preventDefault();
  // récupère les valeurs saisie par le user pour l'email et le mot de passe
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // test
  // console.log(email, password)

  // effectue une requête POST vers l'API POST users/login
  fetch("http://localhost:5678/api/users/login", {
    // spécifie la méthode de la requête (POST)
    method: "POST",
    // indique le type de media du corps de la requête (JSON)
    headers: {
      "Content-Type": "application/json",
    },
    // convertit les données en JSON et les envoie dans le corps de la requête
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    // traite la réponse de l'API après vérification des données d'authentification
    .then(manageResponseAPI)

    // Gestion des erreurs d'authentification :
    .catch(handleError);
}

// fonction asynchrone qui traite la réponse de l'API
// en parametre la réponse qui doit être traiter
async function manageResponseAPI(response) {
  if (response.ok) {
    // controle
    console.log(response);

    // créer une variable pour stoker les données convertit en JSON
    const data = await response.json();
    // enregistre le token dans le localStorage
    localStorage.setItem(`token`, data.token);
    /************
     * controle du token enregistrer voir directement dans la console du navigateur
     * Appli/ Stockage local
     * Clé token
     * Valeur porvenant de l'API: ey .......
     * **********/

    // redirige vers la page index.html Mode Edition
    window.location.href = "../index.html";
  } else {
    // Sinon si c'est pas ok, récupération du message d'erreur de l'API au format JSON
    const errorData = await response.json();
    // controle
    console.error(errorData);
    // lance une erreur avec le message d'erreur de l'API
    throw new Error(errorData.message);
  }
}

// fonction pour traiter les erreurs de l'API
// en paramètre l'erreur qui sera traiter et afficher
function handleError(error) {
  // récupère le message d'erreur si il existe
  const existingErrorMessage = document.querySelector("p");

  if (existingErrorMessage) {
    existingErrorMessage.remove();
  }

  // création de l'élément qui va afficher le message d"erreur
  const errorMessage = document.createElement("p");

  if (error.message === "user not found") {
    // ajoute à lélément le message utiliser dans l'API
    errorMessage.textContent = error.message;
  } else {
    errorMessage.textContent =
      "Email ou Mot de passe Incorrect. Veuillez réessayez";
  }

  // récupère l'élément "form"
  const loginSection = document.getElementById("login");
  // rattache le message au DOM du formulaire
  loginSection.insertBefore(errorMessage, loginSection.querySelector("form"));
  // controle
  console.log("Erreur message API", errorMessage);

  if (errorMessage) {
    const form = document.querySelector("form");
    form.style.marginTop = "0";
  }
}

// Fonction qui créer le footer
function createFooter() {
  // récupère le body
  const loginBody = document.body;
  const footerLogin = document.querySelector("footer");
  footerLogin.innerHTML = `
        <nav>
        <ul>
        <li>Mentions Légales</li>
        </ul>
        </nav>
    `;
  loginBody.appendChild(footerLogin);
}

function init() {
  createHeader();

  addFormEventListener();

  createFooter();
}

init();