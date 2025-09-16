// src/pages/Detail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import pokeApiServices, { imageUrl } from "../services/pokeApiServices";

export const Detail = () => {
  const { id } = useParams();
  const { dispatch } = useGlobalReducer();
  const [data, setData] = useState(null);
  const [description, setDescription] = useState("");


  useEffect(() => {
    const load = async () => {
      try {
        dispatch({ type: "set_loading", payload: true });
        const detail = await pokeApiServices.getPokemonDetail(id);
        setData(detail);

        // species → descripción
        const species = await pokeApiServices.getPokemonSpecies(id);
        const entry =
          species.flavor_text_entries.find((e) => e.language.name === "es") ||
          species.flavor_text_entries.find((e) => e.language.name === "en");

        setDescription(entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "Sin descripción");
      } catch (e) {
        dispatch({ type: "set_error", payload: e.message });
      } finally {
        dispatch({ type: "set_loading", payload: false });
      }
    };
    load();
  }, [id, dispatch]);
  return (
    <div className="container detail-poki mt-3 py-3 pokemon-detail bgcolor">
      <Link to="/" className="btn btn-secondary mb-3 ">← Back</Link>

      {!data ? (
        <div className="alert alert-info">Loading…</div>
      ) : (
        <div className="row g-4 ">
          <div className="col-12 col-md-4 ">
            
            <img 
              src={imageUrl(id)}
              alt={data.name}
              className="img-fluid rounded bg-light p-3"
              onError={(e) => { e.currentTarget.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"; }}
            />
          </div>
          <div className="col-12 col-md-8 ">
            <h2 className="mb-3 text-capitalize">{data.name}</h2>

             {/* Nuevo Descripción */}
            <p className="fst-italic text-dark fw-bold">{description}</p>

            <div className="mb-3">
              <div className="small text-dark fw-bold">Types</div>
              <div className="d-flex gap-2">
                {(data.types || []).map((t) => (
                  <span className="badge bg-danger" key={t.type.name}>{t.type.name}</span>
                ))}
              </div>
            </div>

          

            <div className="container">
              <div className="col-6 mb-2">
                <div className="small text-dark fw-bold">Height</div>
                <div className="fw-semibold">{data.height}</div>
              </div>
              <div className="col-6 mb-2">
                <div className="small text-dark fw-bold">Weight</div>
                <div className="fw-semibold">{data.weight}</div>
              </div>
              <div className="col-12 mb-2">
                <div className="small text-dark fw-bold">Abilities</div>
                <div className="fw-semibold">
                  {(data.abilities || []).map((a) => a.ability.name).join(", ")}
                </div>
              </div>
            </div>

            <h5 className="mt-4 text-dark fw-bold">Stats</h5>
            <div className="row">
              {(data.stats || []).map((s) => (
                <div className="col-6 col-md-4 mb-2 " key={s.stat.name}>
                  <div className="small text-muted">{s.stat.name}</div>
                  <div className="fw-semibold">{s.base_stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
