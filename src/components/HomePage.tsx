"use client";
import { getApiCaller } from "@/libs/ApiCaller";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";

interface PokemonResult {
    name: string;
    url: string;
}

interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}

interface ApiResponse {
    status: string | number;
    message?: string;
    data?: PokemonResponse;
}

const HomePage = () => {
    const [search, setSearch] = useState("")
    const [pokemonData, setPokemonData] = useState<PokemonResult[]>([]);
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const limit = 20

    const fetchPokemon = async () => {
        setIsLoading(true)
        try {
            const response: ApiResponse = await getApiCaller(`pokemon?offset=${offset * limit}limit=${limit}`);
            if (response.status === 200 && response.data) {
                setPokemonData(response.data.results);
                setCount(response.data.count)
            } else {
                setPokemonData([]);
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [currentPage]);

    const getPokemonId = (url: string) => url.split("/").filter(Boolean).pop();
    const getPokemonImage = (url: string) => {
        const id = getPokemonId(url);
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setOffset((page - 1) * limit);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLocaleLowerCase()
        setSearch(searchText)
        // if there nothing in search text
        if (searchText === "") {
            fetchPokemon();
            return;
        }
        const filtered = pokemonData?.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchText)
        );
        setPokemonData(filtered)
    }

    return (
        <div className="p-6 my-3">
            <div className="flex justify-end mb-4">
                <input
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                />
            </div>
            {isLoading &&
                <div className="flex justify-center">Loading...</div>
            }
            {!isLoading && pokemonData.length === 0 &&
                <div className="flex justify-center">Oops, there is no pokemon found.</div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[80vh]">
                {!isLoading && pokemonData?.map((pokemon) => {
                    const id = pokemon.url.split("/").at(-2)
                    return (
                        <Link href={`/pokemon/${id}`} key={pokemon.url}>
                            <div key={pokemon.url} className="max-w-sm bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-400">
                                <img
                                    className="rounded-t-lg"
                                    src={getPokemonImage(pokemon.url)}
                                    alt="Blog Image"
                                    width={250}
                                    height={300}
                                />
                                <p className="p-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                                    {pokemon.name}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
            {!isLoading && pokemonData.length !== 0 &&
                <Pagination count={count} limit={limit} currentPage={currentPage} onPageChange={handlePageChange} />
            }
        </div>
    );
}

export default HomePage