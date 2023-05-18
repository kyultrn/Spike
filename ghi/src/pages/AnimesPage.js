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

    // async function getPopularAnimes() {
    //     const tvApiUrl = searchMade
    //       ? `https://api.themoviedb.org/3/search/tv?api_key=13ed770be7087e090e65be33f0396891&with_genres=16&with_keywords=210024&query=${search}&page=${pageNumber}`
    //       : selectedGenres?.length > 0
    //       ? `https://api.themoviedb.org/3/discover/tv?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&sort_by=popularity.desc&page=${pageNumber}&with_genres=${selectedGenres.join(
    //           "%2C"
    //         )}`
    //       : `https://api.themoviedb.org/3/tv/popular?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&page=${pageNumber}`;

    //     const movieApiUrl = searchMade
    //       ? `https://api.themoviedb.org/3/search/movie?api_key=13ed770be7087e090e65be33f0396891&with_genres=16&with_keywords=210024&query=${search}&page=${pageNumber}`
    //       : selectedGenres?.length > 0
    //       ? `https://api.themoviedb.org/3/discover/movie?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&sort_by=popularity.desc&page=${pageNumber}&with_genres=${selectedGenres.join(
    //           "%2C"
    //         )}`
    //       : `https://api.themoviedb.org/3/movie/popular?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&page=${pageNumber}`;

    //     const [tvRes, movieRes] = await Promise.all([
    //       axios.get(tvApiUrl),
    //       axios.get(movieApiUrl)
    //     ]);

    //     const tvAnimes = filterResults(tvRes.data.results);
    //     const movieAnimes = filterResults(movieRes.data.results);

    //     // Combine the results of both TV shows and movies into one array
    //     const animes = [...tvAnimes, ...movieAnimes];

    //     console.log("This is the combined data:", animes);

    //     // Rest of your code...

    //     // Filter function to filter the results based on the genre
    //     function filterResults(results) {
    //       if (filter === "featured") {
    //         return results.filter(anime => anime.genre_ids.includes(16));
    //       }
    //       return results;
    //     }
    //   }


    async function getPopularAnimes() {
        const res = await axios.get(
          searchMade
            ? `https://api.themoviedb.org/3/search/tv?api_key=13ed770be7087e090e65be33f0396891&with_genres=16&with_keywords=210024&query=${search}&page=${pageNumber}`
            + `https://api.themoviedb.org/3/search/movie?api_key=13ed770be7087e090e65be33f0396891&with_genres=16&with_keywords=210024&query=${search}&page=${pageNumber}`
            : selectedGenres?.length > 0
            ? `https://api.themoviedb.org/3/discover/tv?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&sort_by=popularity.desc&page=${pageNumber}&with_genres=${selectedGenres.join("%2C")}`
            : `https://api.themoviedb.org/3/tv/popular?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&page=${pageNumber}`
        );
        console.log("this is data:", res.data.results)
        let animes;

        if (filter === "featured") {
          if (searchMade) {
            animes = res.data.results.filter(anime => {
              return anime.genre_ids.includes(16);
            });
          } else {
            animes = res.data.results;
          }
        }

        if (filter === "newest") {
          let filteredAnimes = searchMade
            ? res.data.results.filter(anime => anime.genre_ids.includes(16))
            : res.data.results;

          filteredAnimes.sort((a, b) => {
            const yearA = parseInt(a.first_air_date?.slice(0, 4));
            const yearB = parseInt(b.first_air_date?.slice(0, 4));
            return yearB - yearA;
          });

          // Adjust pagination based on the filtered results
          const pageSize = 20; // Number of results per page
          const startIndex = (pageNumber - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          animes = filteredAnimes.slice(startIndex, endIndex);
        }

        if (filter === "oldest") {
          let filteredAnimes = searchMade
            ? res.data.results.filter(anime => anime.genre_ids.includes(16))
            : res.data.results;

          filteredAnimes.sort((a, b) => {
            const yearA = parseInt(a.first_air_date?.slice(0, 4));
            const yearB = parseInt(b.first_air_date?.slice(0, 4));
            return yearA - yearB;
          });

          // Adjust pagination based on the filtered results
          const pageSize = 20; // Number of results per page
          const startIndex = (pageNumber - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          animes = filteredAnimes.slice(startIndex, endIndex);
        }

        if (filter === "rating") {
          let filteredAnimes = searchMade
            ? res.data.results.filter(anime => anime.genre_ids.includes(16))
            : res.data.results;

          filteredAnimes.sort((a, b) => b.vote_average - a.vote_average);

          // Adjust pagination based on the filtered results
          const pageSize = 20; // Number of results per page
          const startIndex = (pageNumber - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          animes = filteredAnimes.slice(startIndex, endIndex);
        }

        const animeTotalPages = res.data.total_pages;

        setAnimesData(animes);
        if (selectedGenres.length > 0) {
          setPageNumber(1);
        }
        if (searchMade || selectedGenres.length > 0) {
            const filteredTotalPages = Math.ceil(animes.length / 20);
            setTotalPages(filteredTotalPages < 500 ? filteredTotalPages : 500);
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
                                    year={anime.first_air_date?.slice(0, 4)}
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
