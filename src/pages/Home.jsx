// src/pages/Home.jsx
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

export const Home = () => {
  const { store } = useGlobalReducer(); //estado global de todos los pokemis, favoritos, etc
  const { pokemons = [] } = store; // desestructa solo (pokemons) si no hay pokemis usamos array vacio asi se evita errores

  // Cortamos el array en dos bloques de 12
  const firstRow = pokemons.slice(0, 12); // toma los primeros 12 pokemon para mostralo en la primera fila
  const secondRow = pokemons.slice(12, 24); //toma los pokemis desde el 13  al 24

//render
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Pokemon first Row</h2>
      <div className="pokemon-scroll">
        {firstRow.map((p) => (
          <div key={p.name} className="me-3" style={{ flex: "0 0 auto", width: "180px" }}> {/*0 0 ni crece ni se encoje y se quedara con su tamaño que le demos (180px) */}
            <Card item={p} /> {/*key={p.name} es el identificador unico para react .map recorre cada pokemon(p)*/}
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-5">Pokemon second Row</h2>
      <div className="pokemon-scroll">
        {secondRow.map((p) => (
          <div key={p.name} className="me-3" style={{ flex: "0 0 auto", width: "180px" }}>
            <Card item={p} />
          </div>
        ))}
      </div>
    </div>
  );
};
