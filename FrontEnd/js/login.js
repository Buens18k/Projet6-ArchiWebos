// récupère la div login
const loginDiv = document.querySelector(".login");
// test
console.log(loginDiv);

// créer un élément contenant le contenue du header
const headerLogin = document.createElement("header");
headerLogin.innerHTML = `
    <h1>Sophie Bluel <span>Architecte d'intérieur</span></h1>
    <nav>
        <ul>
            <li>projets</li>
            <li>contact</li>
            <li>login</li>
            <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
        </ul>
    </nav>
`;
// ajoute le header dans la div login en tant qu'enfant
loginDiv.appendChild(headerLogin);

const loginContent = document.createElement("div");


loginDiv.appendChild(loginContent);
