async function fetchWorks() {
  // Récupération des données de l'API
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();

  console.log(works);
}

fetchWorks();