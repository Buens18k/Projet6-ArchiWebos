// Fonction asynchone pour récupérer les données de l'API works
export async function fetchWorks() {
  try {
    // Requête pour récupérer les données de l'API works
    const response = await fetch("http://localhost:5678/api/works");

    // Vérifie si la réponse est ok (statut 200)
    if (!response.ok) {
      // Si la réponse n'est pas ok, obtient le message d'erreur de la réponse
      const errorMessage = await getErrorMessage(response);
      // Lance une erreur avec le message d'erreur obtenu
      throw new Error(errorMessage);
    }
    // Retourne les données JSON de la réponse si la réponse est ok
    return await response.json();
  } catch (error) {
    // Affiche un message à l'utilisateur
    console.error("Erreur lors de la récupération des travaux:", error);
    // Relance l'erreur pour laisser à l'application de gérer l'erreur
    throw error;
  }
}

// Fonction asynchone pour récupérer les données de l'API catégories
export async function fetchCategory() {
  try {
    // Requête pour récupérer les données de l'API catégories
    const response = await fetch("http://localhost:5678/api/categories");

    if (!response.ok) {
      const errorMessage = await getErrorMessage(response);
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
    throw error;
  }
}

// Fonction pour gérer les réponses
async function getErrorMessage(response) {
  // Si le statut de la réponse est égale à statut 200
  if (response.status === 200) {
    // Enregistre la réponse
    const responseData = await response.json();
    // Retourne la réponse
    return responseData.message;
  }

  // Si la réponse a un statut différent de 200, obtient le message d'erreur de la réponse JSON
  const errorData = await response.json();
  // Retourne la réponse
  return errorData.message;
}

// Fonction pour filtrer les données de l'API works par catégories
export function categoryFilter(works, categoryId) {
  // Retourne les éléments ayant le même ID de catégorie que celui spécifié
  if (categoryId === 0) {
    return works;
  } else {
    return works.filter((work) => work.categoryId === categoryId);
  }
}
