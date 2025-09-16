// src/services/pokeApiServices.js
const BASE_URL = "https://pokeapi.co/api/v2";

/* Devuelve el ID a partir de la URL (…/pokemon)  */
export function getPokemonIdFromUrl(url) {
   const parts = url.split("/"); //convierte la url en array te da el pokemom por id 
  return parts[parts.length - 2];// penultimo pokemon 
}

/** Imagen oficial a parter de su */
export function imageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
  // Obtiene lista de pokémon (por defecto 20)
const pokeApiServices = {
  async getPokemons() {
    try {
      const resp = await fetch(`${BASE_URL}/pokemon`);
      if (!resp.ok) throw new Error("Error fetching pokemons");
      return await resp.json(); //devuelve lista {results: [...]}
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  // Obtiene detalle de un pokémon por id o nombre
  async getPokemonDetail(idOrName) {
    try {
      const resp = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
      if (!resp.ok) throw new Error("Error fetching detail");
      return await resp.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

export default pokeApiServices;
