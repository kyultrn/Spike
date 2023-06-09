import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HomeBlock from "../components/HomeBlock";
import "./Home.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../components/Skeleton.css";
import AnimesList from "../components/AnimesList";
import Anime from "../components/Anime.js";
import Nav from "../components/Nav";

export default function Home() {
  const settings = {
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 15000,
    autoplaySpeed: 1200,
    smartSpeed: 500,
  };

  const [loading, setLoading] = useState(true);
  const [animesData, setAnimesData] = useState([]);
  const [showsData, setShowsData] = useState([]);

  async function getTopAnimes() {
    const url =
      "https://api.themoviedb.org/3/discover/tv?api_key=13ed770be7087e090e65be33f0396891&with_keywords=210024&sort_by=popularity.desc&air_date.gte=2022-11-01&air_date.lte=2023-04-10";
    const data = await axios.get(url, { params: { page: 1 } });
    const animes = data.data.results.slice(0, 17);
    setAnimesData(animes);
  }

  useEffect(() => {
    Promise.all([getTopAnimes()]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
      <div id="container" className="home">
        <Nav />
        {loading ? (
          <div className="carousel_skeleton skeleton" />
        ) : (
          <OwlCarousel className="owl-theme" {...settings}>
            {animesData?.slice(0, 5).map((anime) => (
              <div>
                <HomeBlock
                  title={anime.name}
                  backDrop={anime.backdrop_path}
                  likes={anime.vote_average}
                  year={anime.first_air_date.slice(0, 4)}
                  language={anime.original_language}
                  overview={anime.overview}
                  id={anime.id}
                  key={anime.id}
                  anime={true}
                />
              </div>
            ))}
          </OwlCarousel>
        )}
        <div>
          <AnimesList
            listItems={
              <>
                {animesData?.slice(5, 17).map((anime) => (
                  <Anime
                    title={anime.name}
                    poster={anime.poster_path}
                    id={anime.id}
                    key={anime.id}
                    year={anime.first_air_date.slice(0, 4)}
                    anime={true}
                  />
                ))}
              </>
            }
            text="Popular Animes"
            home={true}
            animes={true}
            loading={loading}
            key={1}
            amountOfAnimes={12}
          />
        </div>
      </div>
  );
}
