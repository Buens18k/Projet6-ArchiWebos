// fonction asynchone pour récupérer les données de l'API works
export async function fetchWorks() {
  try {
    // Requête pour récupérer les données de l'API works
    const response = await fetch("http://localhost:5678/api/works");
    
    // Vérifie si la réponse est ok (statut 200)
    if (!response.ok) {
      // Si la réponse n'est pas ok, obtient le message d'erreur de la réponse
      const errorMessage = await getErrorMessage(response);
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
    throw error;
  }
}

// fonction asynchone pour récupérer les données de l'API catégories
export async function fetchCategory() {
  try {
    // Requête pour récupérer les données de l'API works
    const response = await fetch("http://localhost:5678/api/categories");;
    
    // Vérifie si la réponse est ok (statut 200)
    if (!response.ok) {
      // Si la réponse n'est pas ok, obtient le message d'erreur de la réponse
      const errorMessage = await getErrorMessage(response);
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
    throw error;
  }
}

// fonction pour gérer les réponses
async function getErrorMessage(response) {
  if (response.status === 200) {
    const responseData = await response.json();
    return responseData.message;
  }
  const errorData = await response.json();
  return errorData.message;
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
