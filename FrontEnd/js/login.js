// récupère le body
const loginBody = document.body;
// récupère le main
const mainLogin = document.createElement("main");

// Fonction qui créer le header et les éléments
function createHeader() {
  // récupère le header
  const headerLogin = document.createElement("header");

  // créer un élément contenant le contenue du header
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
  // ajoute le header dans la div login en tant qu'enfant
  loginBody.appendChild(headerLogin);
}

// Fonction qui créer le formulaire + le bouton et le lien MPforget
function createFormLogin() {
  const loginContent = document.createElement("section");
  loginContent.setAttribute("id", "login");
  loginContent.innerHTML = `
    <h2 class="login_title">Login</h2>
    <form action="#" method="post">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <label for="password">Mot de passe</label>
      <input type="text" name="password" id="password" />
      <input type="submit" value="Se connecter" />
      <a class="mp-forget" href=""> Mot de passe oublier</a>
    </form>
  `;
  mainLogin.appendChild(loginContent);

  // test de vérification de connection

  // récupère l'élément formulaire
  const form = document.querySelector("form");
  // ajout un écouteur d'évènement sur le formulaire pour intercepter la soumission
  form.addEventListener("submit", function (event) {
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
      .then(async (response) => {
        // vérifie si la réponse de l'API est OK (code 200)
        if (response.ok) {
          // controle
          console.log(response);
          // redirige vers la page index.html
          window.location.href = "../index.html";
        } else {
          // Sinon si c'est pas ok, récupération du message d'erreur de l'API au format JSON
          const errorData = await response.json();
          // controle
          console.error(errorData);
          // lance une erreur avec le message d'erreur de l'API
          throw new Error(errorData.message);
        }
      })
      // Gestion des erreurs d'authentification : 
      // crée un élément de paragraphe pour afficher le message d'erreur de l'API
      .catch((error) => {
        // création de l'élément qui va afficher le message d"erreur
        const errorMessage = document.createElement("p");
        // ajoute à lélément le message utiliser dans l'API
        errorMessage.textContent = error.message;
        // rattache le message au DOM du formulaire
        form.appendChild(errorMessage);
        // controle
        console.log("Erreur message API", errorMessage);
      });
  });
}

// Fonction qui écoute le formulaire de connexion
function loginListener() {
  // const form = document.querySelector("form");
}

// Fonction qui créer le footer
function createFooter() {
  const footerLogin = document.createElement("footer");
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
  // test
  // console.log(loginBody);

  createHeader();

  loginBody.appendChild(mainLogin);

  createFormLogin();
  createFooter();
}

init();
