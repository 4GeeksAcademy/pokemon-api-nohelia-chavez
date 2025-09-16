// src/components/Card.jsx
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getPokemonIdFromUrl, imageUrl } from "../services/pokeApiServices";

export default function Card({ item }) {
  // item viene de la API: { name, url }
  const id = getPokemonIdFromUrl(item.url);
  const { store, dispatch } = useGlobalReducer();

  // Normaliza comparaciones de id (por si uno es string y otro number)
  const isFav = store.favorites?.some(f => String(f.id) === String(id));
  const inReadLater = store.readLater?.some(r => String(r.id) === String(id));

  // ❤️  favorito
  const onToggleFavorite = () => {
    dispatch({
      type: "toggle_favorite",
      payload: { id, name: item.name, url: item.url }
    });
  };

  // agrega a Read later sin duplicar
  const onAddReadLater = () => {
    if (!inReadLater) {
      dispatch({
        type: "add_read_later",
        payload: { id, name: item.name, url: item.url }
      });
    }
  };

  return (
    <div className="card h-100 d-flex flex-column">

      <img
        src={imageUrl(id)}
        alt={item.name}
        className="card-img-top bg-light p-3"
        onError={(e) => {
          e.currentTarget.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
        }}
      />


      <div className="card-body d-flex flex-column"> {/* contenedor flex vertical */}
        <h6 className="card-title text-capitalize mb-2 text-truncate" title={item.name}>
          {item.name}
        </h6>

        {/* Acciones al fondo del body */}
        <div className="mt-auto d-flex gap-2 align-items-center">
          {/* Read later */}
          <button
            type="button"
            className={`btn btn-sm ${inReadLater ? "btn-primary" : "btn-outline-primary"}`}
            onClick={!inReadLater ? onAddReadLater : undefined}
            disabled={inReadLater}
            title={inReadLater ? "Ya está agregado" : "Añadir a Read later"}
          >
            {inReadLater ? (
              <>
                <i className="fa-solid fa-bookmark me-1" />
                Added
              </>
            ) : (
              <>
                <i className="fa-regular fa-bookmark me-1" />
                Read later
              </>
            )}
          </button>

          {/* Detalle */}
          <Link to={`/detail/${id}`} className="btn btn-outline-success btn-sm ms-auto">
            Details
          </Link>

          {/* ❤️ Favorito */}
          <button
            type="button"
            className="btn btn-light border btn-sm"
            title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
            onClick={onToggleFavorite}
          >
            {isFav ? (
              <i className="fa-solid fa-heart text-danger" />
            ) : (
              <i className="fa-regular fa-heart" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}