//  fonction de récupération des données API works
async function fetchWorks() {
  // Récupération des données de l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  //  retourne en json
  return await reponse.json();
  // Test de fonctionnement
  //   console.log(works);
}

// fonction d'initialisation
async function init() {
  // récupère les données API stockées works
  const works = await fetchWorks();
  // Test de fonctionnement
  console.log(works);
}

// appel de la fonction d'initialisation
init();
