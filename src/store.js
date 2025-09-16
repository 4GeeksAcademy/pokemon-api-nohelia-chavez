
export const initialStore = () => {
  const saved = JSON.parse                    //JSON.parse lo convierte de texto a obj JS

  (localStorage.getItem("app-store")          // lee lo que se guarda en el navegador

   || "{}");                       //Si no guarda nada (null), ponemos un objeto vacío {} para que no explote.


   //devuelve el estado inicial
  return {
    pokemons: [], // la lista principal de  la API
    favorites: saved.favorites || [],
    readLater: saved.readLater || [],
    loading: false,
    error: ""
  };
};

// Guarda cada vez que se cambia el readLater o favorites
function save(store) {
  localStorage.setItem( // guarda como texto
    "app-store",
    JSON.stringify({    //convierte el objeto a texto JSON
      favorites: store.favorites,
      readLater: store.readLater
    })
  );
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    // Lista de pokémon API
    case "getPokemons":
      return { ...store, pokemons: action.payload?.data || [] }; // si no hay nada usa el array vacio

    // activa y desactiva spinner
    case "set_loading":
      return { ...store, loading: !!action.payload };
    case "set_error":
      return { ...store, error: String(action.payload || "") }; //guarda un mensaje de error como string

    // un toggle porque funciona como interruptor
    case "toggle_favorite": {
      const { id, name, url } = action.payload;
      const exists = store.favorites.some(f => String(f.id) === String(id));// some busca si ya existe en favoritos 
      const favorites = exists
        ? store.favorites.filter(f => String(f.id) !== String(id))// si existe  lo elimina
        : [...store.favorites, { id, name, url }];
      const next = { ...store, favorites }; // si no existe lo agrega (...spread)
      save(next);
      return next; //lo guarda y lo devuelve actualizado
    }

    //  agrega al pokemi solo si no existe
    case "add_read_later": {
      const { id, name, url } = action.payload;
      const exists = store.readLater.some(r => String(r.id) === String(id));
      if (exists) return store;
      const next = { ...store, readLater: [...store.readLater, { id, name, url }] };
      save(next);
      return next;
    }

    // elimina al pokemi de la lista filtrando por id y lo guarda en el localStorage
    case "remove_read_later": {
      const { id } = action.payload;
      const next = { ...store, readLater: store.readLater.filter(r => String(r.id) !== String(id)) };
      save(next);
      return next;
    }

    // 🧹 Limpiar todo Read later
case "clear_read_later": {
  const next = { ...store, readLater: [] };
  save(next); // también actualiza localStorage
  return next;
}


    default:
      return store; 
  }
}
