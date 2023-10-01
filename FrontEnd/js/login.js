// récupère le body
const loginBody = document.body;
const headerLogin = document.createElement("header");
const mainLogin = document.createElement("main");

// Fonction qui créer le header et les éléments
function createHeader() {
  // créer un élément contenant le contenue du header
  headerLogin.innerHTML = `
      <h1>Sophie Bluel <span>Architecte d'intérieur</span></h1>
      <nav>
          <ul>
              <li>projets</li>
              <li>contact</li>
              <li>login</li>
              <li><img src="../assets/icons/instagram.png" alt="Instagram"></li>
          </ul>
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
      <input type="text" name="email" id="email" />
      <label for="mp">Mot de passe</label>
      <input type="email" name="mp" id="mp" />
      <input type="submit" value="Se connecter" />
      <a class="mp-forget" href=""> Mot de passe oublier</a>
    </form>
  `;
  mainLogin.appendChild(loginContent);

  const form = document.querySelector("form");
  console.log(form);
  form.addEventListener("submit", function(){

  })
}

// Fonction qui écoute le formulaire de connexion
function loginListener () {
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
