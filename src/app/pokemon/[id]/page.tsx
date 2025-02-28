"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getApiCaller } from "@/libs/ApiCaller";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

interface Ability {
    ability: { name: string };
}

interface Stat {
    stat: { name: string };
    base_stat: number;
}

interface Type {
    type: { name: string };
}

interface PokemonData {
    name: string;
    id: number;
    sprites: { front_default: string };
    abilities: Ability[];
    stats: Stat[];
    types: Type[];
    moves: { move: { name: string } }[];
}

interface ApiResponse {
    status: string | number;
    message?: string;
    data?: PokemonData;
}

const PokemonDetail = () => {
    const pathname = usePathname()
    const id = pathname.split("/").at(-1)

    const [pokemonDetail, setPokemonDetail] = useState<PokemonData | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchPokemonDetail = async () => {
            setIsLoading(true)
            try {
                const response: ApiResponse = await getApiCaller(`pokemon/${id}`);
                setPokemonDetail(response.data || null)
            } catch (error) {
                console.log("error", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPokemonDetail()
    },[])

    return (
        <div>
            <Navbar />
            {isLoading &&
                <div className="flex items-center justify-center h-screen text-xl">
                    Loading...
                </div>
            }
            <div className="container mx-auto p-6">
                <div className="max-w-3xl mx-auto border-2 border-gray-200 p-4 rounded-2xl">
                    <div className="flex flex-col items-center">
                        <img
                            src={pokemonDetail?.sprites?.front_default}
                            alt={pokemonDetail?.name || ""}
                            className="w-40 h-40 object-contain"
                        />
                        <h1 className="text-3xl font-bold capitalize mt-2">
                            {pokemonDetail?.name}
                        </h1>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Types</h2>
                        <div className="flex gap-2 mt-2">
                            {pokemonDetail?.types?.map((t, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-2xl text-sm capitalize"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Abilities</h2>
                        <div className="flex gap-2 mt-2">
                            {pokemonDetail?.abilities.map((a, index) => (
                                <span key={index}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-2xl text-sm capitalize"
                                >
                                    {a.ability.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Base Stats</h2>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {pokemonDetail?.stats.map((s, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between bg-gray-200 p-2 rounded-md"
                                >
                                    <span className="capitalize">{s.stat.name}</span>
                                    <span className="font-bold">{s.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Moves</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {pokemonDetail?.moves.slice(0, 10).map((m, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-green-500 text-white rounded-2xl text-sm capitalize"
                                >
                                    {m.move.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PokemonDetail