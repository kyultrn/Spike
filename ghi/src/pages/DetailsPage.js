import React, { useState } from "react";
import "./DetailsPage.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Nav from "../components/Nav";
import AnimesList from "../components/AnimesList";
import axios from "axios";
import { useEffect } from "react";
import Anime from "../components/Anime";
import { useParams } from "react-router-dom";
import NoImage from "../assets/NoImage.png";
import "../components/Skeleton.css";

export default function DetailsPage({ anime }) {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [animeCast, setAnimeCast] = useState([]);
  const [recommendedAnimes, setRecommendedAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { animeId } = useParams();

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    Promise.all([
      getAnimeDetails(),
      getRecommendedAnimes(),
      getAnimeCast(),
    ]).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, [animeId]);

  async function getAnimeDetails() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${animeId}?api_key=13ed770be7087e090e65be33f0396891`
    );

    setAnimeDetails(res.data);
  }

  async function getAnimeCast() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${animeId}/credits?api_key=13ed770be7087e090e65be33f0396891`
    );

    const cast = res.data.cast
      .slice(0, 4)
      .map((actor) => actor.name)
      .join(", ");

    setAnimeCast(cast);
  }

  async function getRecommendedAnimes() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${animeId}/recommendations?api_key=13ed770be7087e090e65be33f0396891&language=en-US&page=1`
    );
    let data;
    let res2;

    if (res.data.results.length === 0) {
      res2 = await axios.get(
        `https://api.themoviedb.org/3/tv/${animeId}/similar?api_key=13ed770be7087e090e65be33f0396891&language=en-US&page=1`
      );
      data = res2.data.results.slice(0, 4);

      return setRecommendedAnimes(data);
    }

    data = res.data.results.slice(0, 4);
    setRecommendedAnimes(data);
  }

  console.log(recommendedAnimes)

  return (
    <div className="detailsPage">
      <div className="detailsPage__row row">
        <Nav />
        <div
          className="detailsPage__anime"
          style={{
            backgroundImage: loading
              ? null
              : animeDetails?.backdrop_path &&
                `url("https://image.tmdb.org/t/p/original${animeDetails.backdrop_path}")`,
          }}
        >
          <div id="anime-row" className="detailsPage__anime--content">
            <figure className="detailsPage__anime--img">
              {loading ? (
                <div
                  className="skeleton"
                  style={{
                    width: "360px",
                    maxWidth: "100%",
                    aspectRatio: "2 / 3",
                  }}
                ></div>
              ) : (
                <img
                  src={
                    animeDetails.poster_path
                      ? `https://image.tmdb.org/t/p/original${animeDetails.poster_path}`
                      : NoImage
                  }
                  alt=""
                />
              )}
            </figure>
            <div className="detailsPage__anime--text">
              {loading ? (
                <div
                  className="skeleton"
                  style={{ width: "700px", height: "60px", maxWidth: "90%" }}
                ></div>
              ) : (
                <h1>
                  {anime
                    ? animeDetails?.title
                    : animeDetails?.name }
                </h1>
              )}
              {loading ? (
                <div
                  className="skeleton"
                  style={{
                    width: "400px",
                    height: "32px",
                    maxWidth: "70%",
                    marginTop: "16px",
                  }}
                ></div>
              ) : (
                <div className="detailsPage__anime--details">
                  <p className="detailsPage__anime--language">
                    {animeDetails?.original_language}
                  </p>
                  <p className="detailsPage__anime--genres">
                    {animeDetails?.genres
                      ?.map((genre) => genre.name)
                      .join(", ")}
                  </p>
                  <div className="detailsPage__anime--year">
                    <CalendarMonthIcon />
                    <p>
                      {anime
                        ? animeDetails?.release_date?.slice(0, 4)
                        : animeDetails?.first_air_date?.slice(0, 4)}
                    </p>
                  </div>
                  <div
                    className={`detailsPage__anime--${
                      anime ? "runtime" : "seasons"
                    }`}
                  >
                    {anime && <AccessTimeIcon />}
                    <p>
                      {anime
                        ? animeDetails?.runtime + "m"
                        : animeDetails?.number_of_seasons +
                          " " +
                          `Season${
                            animeDetails?.number_of_seasons > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>
              )}
              {loading ? (
                <>
                  <div
                    className="skeleton"
                    style={{
                      width: "600px",
                      height: "32px",
                      maxWidth: "90%",
                      marginTop: "32px",
                    }}
                  ></div>
                  <div
                    className="skeleton"
                    style={{
                      width: "600px",
                      height: "32px",
                      maxWidth: "90%",
                      marginTop: "32px",
                    }}
                  ></div>
                  <div
                    className="skeleton"
                    style={{
                      width: "400px",
                      height: "32px",
                      maxWidth: "90%",
                      marginTop: "12px",
                    }}
                  ></div>
                </>
              ) : (
                <>
                  {animeCast && (
                    <div className="detailsPage__anime--actors">
                      <h4>Starring:</h4>
                      <p>{animeCast}</p>
                    </div>
                  )}{" "}
                  {animeDetails?.overview && (
                    <div className="detailsPage__anime--overview">
                      <h4>Overview:</h4>
                      <p>{animeDetails?.overview}</p>
                    </div>
                  )}
                </>
              )}
              {(animeDetails?.vote_average ||
                animeDetails?.production_companies?.length > 0) && (
                <div className="detailsPage__anime--bottom">
                  {loading ? (
                    <div
                      className="skeleton"
                      style={{
                        width: "700px",
                        height: "32px",
                        maxWidth: "90%",
                        marginTop: "24px",
                      }}
                    />
                  ) : (
                    <>
                      {animeDetails?.vote_average && (
                        <div className="detailsPage__anime--rating">
                          <h4>User Rating:</h4>
                          <p>
                            {Math.round(animeDetails?.vote_average * 10) / 10} /
                            10
                          </p>
                        </div>
                      )}
                      {animeDetails?.production_companies?.length >= 1 && (
                        <div className="detailsPage__anime--producers">
                          <h4>Producers:</h4>
                          <p>
                            {animeDetails?.production_companies
                              ?.map((producer) => producer.name)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {loading ? (
                <div
                  className="skeleton"
                  style={{ width: "90%", height: "80px" }}
                />
              ) : (
                <button
                  className="detailsPage__anime--button pointer"
                  onClick={() => alert("This feature is not yet implemented!")}
                >
                  watch now
                </button>
              )}
            </div>
          </div>
        </div>

        <AnimesList
            text={`Recommended ${anime ? "Animes" : "Animes"}`}
            listItems={recommendedAnimes.map((recommendedAnime) => (
                <Anime
                    title={
                        recommendedAnime.name ||
                        recommendedAnime.original_name
                    }
                    poster={recommendedAnime.poster_path}
                    id={recommendedAnime.id}
                    key={recommendedAnime.id}
                    year={
                        recommendedAnime.first_air_date?.slice(0, 4) ||
                        recommendedAnime.release_date?.slice(0, 4)
                    }
                    anime={anime}
                />
            ))}
            loading={loading}
            amountOfAnimes={4}
        />
      </div>
    </div>
  );
}
