import React from "react";
import Layout from "../Components/Layout";
import Link from "next/Link";

export default function pokemon({ pokemons }) {
  return (
    <Layout title={pokemons.name}>
      <h1 className="text-4xl mb-8 text-center">{pokemons.name}</h1>
      <img className="mx-auto" src={pokemons.image} alt={pokemons.name} />
      <p>
        <span className="font-bold mr-2">Weight: </span> {pokemons.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span> {pokemons.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokemons.types.map((type, index) => (
        <p key={index}>{type.type.name} </p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemons = await res.json();
    const paddedId = ("00" + id).slice(-3);
    pokemons.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
      props: { pokemons },
    };
  } catch (err) {
    console.error(err);
  }
}
