import Layout from "../Components/Layout";
import Link from "next/Link";

export default function Home({ pokemons }) {
  return (
    <Layout title="Poke world">
      <h1 className="text-4xl mb-8 text-center font-serif">Poke world</h1>
      <div className="grid grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => (
          <Link href={`/pokemon?id=${index + 1}`}>
            <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
              <img
                className="w-20 h-20 mr-3"
                src={pokemon.image}
                alt={pokemon.name}
              />
              <span className="mr-2 font-bold">{index + 1 + " "}</span>
              {pokemon.name}
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemons = results.map((pokemon, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokemon, image };
    });

    return {
      props: { pokemons },
    };
  } catch (err) {
    console.error(err);
  }
}
