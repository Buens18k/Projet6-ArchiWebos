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
  // retourne les éléments ayant le même ID de catégorie que celui spécifié
  if (categoryId === 0) {
    return works;
  } else {
    return works.filter((work) => work.categoryId === categoryId);
  }
}

// fonction pour obtenir le categoryId à partir du nom de la catégorie
export function getCategoryId(categoryName){
  const categoryNoms = {
    "Objets": 1,
    "Appartements": 2,
    "Hotels & restaurants": 3,
  };
  return categoryNoms[categoryName] || 0;
}