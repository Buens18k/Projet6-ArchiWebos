// fonction asynchone pour récupérer les données de l'API works
export async function fetchWorks() {
  // Requête pour récupérer les données de l'API works
  const reponse = await fetch("http://localhost:5678/api/works");
  // Convertit la réponse en JSON
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

// fonction asynchone pour récupérer les données de l'API catégories
export async function fetchCategory() {
  // Requête pour récupérer les données de l'API catégories
  const reponse = await fetch("http://localhost:5678/api/categories");
  // Convertit la réponse en JSON
  return await reponse.json();

  // test de fonctionnement
  // console.log(category);
}

// fonction pour filtrer les données de l'API works par catégories
export function categoryFilter(works, categoryId) {
  // stock toutes les catégories dans la variable "categoriesTous"
  const categoriesTous = works;
  // console.log("Tous", categoriesTous);

  // stock toutes les catégorie dans la variable "categories1"
  const categories1 = works.filter((work) => {
    return work.categoryId === 1;
  });
  // console.log("Nombre de catégories 1 :", categories1);

  // stock toutes les catégorie dans la variable "categories2"
  const categories2 = works.filter((work) => {
    return work.categoryId === 2;
  });
  // console.log("Nombre de Catégories 2 filtrer =",categories2);

  // stock toutes les catégorie dans la variable "categories3"
  const categories3 = works.filter((work) => {
    return work.categoryId === 3;
  });
  // console.log("Nombre de Catégories 3 filtrer =",categories3);

  // retourne les éléments ayant le même ID de catégorie que celui spécifié
  return works.filter((work) => work.categoryId === categoryId);
}
