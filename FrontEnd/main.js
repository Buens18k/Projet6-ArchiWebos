//  fonction de récupération des données API works
async function fetchWorks() {
  // Récupération des données de l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  //  retourne en json
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

// function de récupération des données de l'API catégory
async function fetchCategory() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();

  // test de fonctionnement
  // console.log(category);
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
// fonction qui filtre par catégories
function categoryFilter(works) {
  const categoriesTous = works;
  console.log("Tous", categoriesTous);

  const categories1 = works.filter((work) => {
    return work.CategoryId === 1;
  });
  console.log("Nombre de catégories 1 :", categories1);

  const categories2 = works.filter((work) => {
    return work.categoryId === 2;
  });
  console.log("Nombre de Catégories 2 filtrer =",categories2);

  const categories3 = works.filter((work) => {
    return work.categoryId === 3;
  })
  console.log("Nombre de Catégories 3 filtrer =",categories3);
}


// function de création de bouton
// function createButtonFilter(works, category) {

// const workFilter = works.filter(category.id);

// // test de fonctionnement
// console.log(works, category);
// // Récupération de la div filter
// const filterDiv = document.querySelector(".filter");
// // console.log(filterDiv)

// // const btnFilter = document.createElement("button");
// // btnFilter.classList.add("btn");
// // btnFilter.innerText = "Tous";
// // filterDiv.appendChild(btnFilter);

// category.forEach((btnCategory) => {
//   const btnFilter = document.createElement("button");
//   btnFilter.classList.add("btn");
//   btnFilter.innerHTML = `${btnCategory.name}`;
//   filterDiv.appendChild(btnFilter);

//   // test de fonctionnement
//   console.log(btnCategory);

//   addventListenerButtonFilter(btnFilter);
// });

// console.log(filterDiv)
// }

// function event listener sur btnFilter
function addventListenerButtonFilter(element) {
  element.addEventListener("click", (event) => {
    // test de fonctionnement
    console.log(element);
  });
}

// function qui assigne le style au bouton selectionner
function addStyleBtnSelectedFilter(element) {
  // element.addEventListener("click", (event) => {
  element.classList.add("btn-selected");
}

// function qui enlève le style au bouton selectionner
function removeStyleBtnSelectedFilter(element) {
  element.classList.remove("btn-selected");
}

// fonction d'initialisation
async function init() {
  // récupère les données API works
  const works = await fetchWorks();
  // récupère les données API categories
  const category = await fetchCategory();

  // Test de fonctionnement
  // console.log(works, category);

  // appelle de la fonction qui créer l'élément figure
  createFigure(works);
  // createButtonFilter(works, category);
  // worksFiltre();
  categoryFilter(works);
}

// appel de la fonction d'initialisation
init();
