import axios from "axios";
import React, { useEffect, useState } from "react";
import Anime from "../components/Anime";
import AnimesList from "../components/AnimesList";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Nav from "../components/Nav";
import "./AnimesPage.css";

export default function AnimesPage () {
    const [animesData, setAnimesData] = useState([]);
    const [animeGenres, setAnimeGenres] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(500);
    const [loading, setLoading] = useState(true);
    const [searchMade, setSearchMade] = useState(false);
    const [filter, setFilter] = useState("featured");
    const [search, setSearch] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageNumber]);

    useEffect(() => {
        setLoading(true);
        Promise.all([getPopularAnimes(), getAnimeGenres()]).then(() => {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        });
    }, [pageNumber, search, filter, selectedGenres]);

    async function getPopularAnimes() {
        const res = await axios.get(
            searchMade
                ? `https://api.themoviedb.org/3/search/tv?api_key=13ed770be7087e090e65be33f0396891&query=${search}&page=${pageNumber}`
                : selectedGenres?.length > 0
                ? `https://api.themoviedb.org/3/discover/tv?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&sort_by=popularity.desc&air_date.gte=2022-11-01&air_date.lte=2023-04-10&page=${pageNumber}&with_genres${selectedGenres.join("%2C")}`
                : `https://api.themoviedb.org/3/tv/popular?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&page=${pageNumber}`
                );

                let animes;

                if (filter === "featured") {
                    animes = res.data.results;
                }
                if (filter === "newest") {
                    animes = res.data.results.sort(
                        (a, b) =>
                            parseInt(b.release_date?.slice(0, 5)) -
                            parseInt(a.release_date?.slice(0, 5))
                    );
                }
                if (filter === "oldest") {
                    animes = res.data.results.sort(
                        (a, b) =>
                            parseInt(a.release_date?.slice(0, 5)) -
                            parseInt(b.release_date?.slice(0, 5))
                    );
                }
                if (filter === "rating") {
                    animes = res.data.results.sort((a, b) => b.vote_average - a.vote_average);
                }

                const animeTotalPages = res.data.total_pages;

                console.log(animes);

                setAnimesData(animes);
                if (selectedGenres.length > 0) {
                    setPageNumber(1);
                }
                if (searchMade || selectedGenres.length > 0) {
                    setTotalPages(animeTotalPages < 500 ? animeTotalPages: 500);
                }
    }

    async function getAnimeGenres() {
        const res = await axios.get(
            "https://api.themoviedb.org/3/genre/tv/list?api_key=13ed770be7087e090e65be33f0396891&language=en-US"
        );

        const data = res.data.genres;

        setAnimeGenres(data);
    }

    return (
        <div className="animesPage">
            <div className="animesPage--top">
                <Nav />
                <Search
                    setFilter={setFilter}
                    filter={filter}
                    setSearch={setSearch}
                    searchMade={searchMade}
                    search={search}
                    setSearchMade={setSearchMade}
                    setPageNumber={setPageNumber}
                />
            </div>
            <AnimesList
                text={"Popular Animes"}
                home={false}
                genres={animeGenres}
                listItems={
                    <>
                        {animesData.length > 0 ? (
                            animesData?.map((anime) => (
                                <Anime
                                    title={anime.name}
                                    poster={anime.poster_path}
                                    id={anime.id}
                                    key={anime.id}
                                    year={anime.release_date?.slice(0, 4)}
                                    anime={true}
                                />
                            ))
                        ) : (
                            <div className="animesPage__results">
                                <h2 style={{ height: "90vh", fontWeight: "300" }}>
                                    Sorry, we couldn't find any matching results for your search.
                                </h2>
                            </div>
                        )}
                    </>
                }
                loading={loading}
                key={3}
                searchMade={searchMade}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                amountOfAnimes={20}
            />
            <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
            />
        </div>
    );
};
