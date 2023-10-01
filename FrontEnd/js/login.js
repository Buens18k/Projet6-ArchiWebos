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
  // ajout un écouteur d'évènement sur le formulaire
  form.addEventListener("submit", function (event) {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();
    // récupère la valeur entrée par le user dans "input" de l'ID "email"
    const email = document.getElementById("email").value;
    // récupère la valeur entrée par le user dans "input" de l'ID "Mot de passe"
    const password = document.getElementById("password").value;
    // test
    // console.log(email, password)

    // fonction fetch pour configurer une requête en appelant l'API 
    // et l'envoyez avec POST en JSON pour verifier la requête
    fetch("http://localhost:5678/api/users/login", {
      // le verbe
      method:  "POST",
      // le media type
      headers: {
        "Content-Type": "application/json",
      },
      // Requête à l'API convertit en JSON
      body: JSON.stringify({
        // le corp de la requête ce qu'il faut vérifier
        email: email,
        password: password,
      }),
    })


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
