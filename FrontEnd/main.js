//  fonction de récupération des données API works
async function fetchWorks() {
  // Récupération des données de l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  //  retourne en json
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

function createFigure(works) {
  // Récupère la div gallery
  const galleryDiv = document.querySelector(".gallery");
  // parcours la liste works en stokant tout le contenu réaliser (dans la boucle) dans la variable temporaire work
  works.forEach((work) => {
    // création de l'élément figure
    const worksFigure = document.createElement("figure");
    // rajoute l'élément créer dans le html avec :
    // son élément img et figcaption
    // en utilisant les données "work" et récupérerant les propriétés "imageUrl, title"
    worksFigure.innerHTML = `
        <img src ="${work.imageUrl}" alt="${work.title}">
	    <figcaption>${work.title}</figcaption>
    `;
    // manipulation du DOM precisant "worksFigure" enfant de "galleryDiv"
    galleryDiv.appendChild(worksFigure);
    // test de fonctionnement
    // console.log(work);
  });
}

// function de récupération des données de l'API catégory
async function fetchCategory (){
    const reponse = await fetch("http://localhost:5678/api/categories");
    const category =  await reponse.json();

    // test de foncitonnement
    console.log(category);
}

// fonction d'initialisation
async function init() {
  // récupère les données API stockées works
  const works = await fetchWorks();
  // Test de fonctionnement
//   console.log(works);

  await fetchCategory();

  // appelle de la fonction qui créer l'élément figure
  createFigure(works);
}

// appel de la fonction d'initialisation
init();
