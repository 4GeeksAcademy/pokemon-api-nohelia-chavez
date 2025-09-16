// src/components/Navbar.jsx  (Link reemplaza a <a href="..."> dentro de React Router)
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer(); //store mi estado global y dispatch para las acciones
  const { favorites = [], readLater = [] } = store; // desestructuro listas  por si vienen vacias y les doy un array vacio

  const removeFav = (id) =>
    dispatch({ type: "toggle_favorite", payload: { id } }); // accion que quita el favorito reusa  toggle-favorite
  //si el id esta en favoritos lo quita

  const removeReadLater = (id) =>
    dispatch({ type: "remove_read_later", payload: { id } });


  //bootstrap
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container navbar-pastel">
        <Link to="/" className="btn btn-outline-light navbar-brand fw-bold text-dark">Pokédex</Link>

        <div className="d-flex align-items-center gap-2">
          {/* ❤️ Favorites */}
          <div className="dropdown">
            <button
              className="btn btn-outline-info fw-bold text-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"

            >
              <i className="fa-solid fa-heart text-danger  me-1" />
              Favorites ({favorites.length}) {/*Muestra el contador actual de favoritos leyendo la longitud del array.*/}
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: 260 }}>
              {favorites.length === 0 ? (
                <li className="text-muted px-2 py-1">No favorites yet</li> //Mensaje en gris cuando la lista está vacía.
              ) : (
                favorites.map((f) => (  //Si no hay favoritos, muestra un empty y si hay, hace .map para listar cada favorito.


                  <li
                    key={f.id} //clave unica para react
                    className="d-flex align-items-center gap-2 px-2 py-1"
                  >
                    <Link
                      to={`/detail/${f.id}`} // detalle del pokemi con ese id
                      className="text-decoration-none text-capitalize flex-grow-1" //quita el subrayado, primera letra mayuscula, boton derecha
                    >
                      {f.name || `#${f.id}`} {/*Muestra el name si existe; si no, un fallback con #id*/}
                    </Link>
                    <button
                      className="btn btn-sm btn-light border" //tamaño y estilo
                      title="Remove from favorites"
                      onClick={() => removeFav(f.id)}  > {/*dispara el dispatch con toggle-favorite */}
                    
                      <i className="fa-solid fa-trash" /> {/*icon trash */}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* 📖 Read later */}
          <div className="dropdown">
            <button
              className="btn btn-outline-warning fw-bold text-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-clock me-1" />
              Read later ({readLater.length}) {/**Texto con contador de elementos para leer */}

            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: 260 }}>
              {readLater.length === 0 ? (
                <li className="text-muted px-2 py-1">Empty</li> // msg si no hay elementos
              ) : (
                readLater.map((p) => ( // recorre cada elemento para leer
                  <li
                    key={p.id}
                    className="d-flex align-items-center gap-2 px-2 py-1"
                  >
                    <Link
                      to={`/detail/${p.id}`} //detalle del pokemi con ese id
                      className="text-decoration-none text-capitalize flex-grow-1"
                    >
                      {p.name || `#${p.id}`} {/**Fallback al id si no hay name "fallback muestra el valor principal cuando no esta disponible"*/}
                    </Link>
                    <button
                      className="btn btn-sm btn-light border"
                      title="Remove from read later"
                      onClick={() => removeReadLater(p.id)}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
