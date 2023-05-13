import React, { useEffect, useState } from "react";
import "./Anime.css";
import NoImage from "../assets/NoImage.png"
import axios from "axios";
import "./Anime.css";
import { useNavigate } from "react-router-dom";
import AnimeSkeleton from "./AnimeSkeleton";

export default function Anime ({ title, poster, id, anime, year }) {
    const [tvGenres, setTvGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getGenres();
    }, []);

    async function getGenres() {
        const res = anime
        await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=13ed770be7087e090e65be33f0396891&language=en-US`
        )

        const data = res.data.genres;
        setTvGenres(data);
        setLoading(false);
    }

    return !loading ? (
        <figure
            className="anime pointer"
            key={id}
            onClick={() => navigate(`/tv/${id}`)}
        >
            {poster ? (
                <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="" />
            ) : (
                <img src={NoImage} />
            )}
            <div className="anime__content">
                <div className="anime__top">
                    <h4>{title}</h4>
                    <div className="anime__genres">
                        {animeGenres?.map((genre) => (
                            <p>{genre.name}</p>
                        ))}
                    </div>
                </div>
            </div>
            {year && <p className="anime__year">{year}</p>}
        </figure>
    ) : (
        <AnimeSkeleton />
    );
};
