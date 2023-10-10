// fonction qui créer les éléments HTML pour chaque figure et les affiches dans la gallery
export function createFigure(works) {
  // parcours la liste des données de l'API works
  works.forEach((work) => {
    // appel de la fonction qui crée une figure pour chaque objets dans les données de l'API works
    createWork(work);
  });
}

// function qui crée un élément "figure" dans la Div "gallery"
export function createWork(work) {
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

// export function createButtonFilter(categoryFetch) {
//   // ajout d'une nouvelle catégories "Tous" en première position dans le tableau des catégories
//   categoryFetch.unshift({ id: 0, name: `Tous` });
//   // Récupère la div filter
//   const filterDiv = document.querySelector(".filter");

//   // Parcours chaque éléments des données de l'API catégories
//   categoryFetch.forEach((category) => {
//     // crée un élément button filtre pour chaques catégories
//     const btnFilter = document.createElement("button");
//     // ajoute à chaques buttons filtre la class .btn
//     btnFilter.classList.add("btn");
//     btnFilter.classList.add("btn-filter");
//     // ajoute le nom de la catégories respective au bouton filtre provenant du tableau "categoryFetch"
//     btnFilter.innerHTML = category.name;
//     // ajoute un écouteur d'évènement
//     addventListenerButtonFilter(worksFetch, category, btnFilter);
//     // ajoute le bouton filtre à la div filter
//     filterDiv.appendChild(btnFilter);
//     // test
//     // console.log(categoryFetch);
//   });
// }
