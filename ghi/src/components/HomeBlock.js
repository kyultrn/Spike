import React, { useEffect, useState } from "react";
import "./HomeBlock.css";
import { Link } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

export default function HomeBlock({
  title,
  backDrop,
  likes,
  year,
  language,
  overview,
  id,
}) {
  const [loading, setLoading] = useState(true);
  const [animeGenres, setAnimeGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  async function getGenres() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=13ed770be7087e090e65be33f0396891&language=en-US`
    );
    console.log(res);
    const data = res.data.genres;
    setAnimeGenres(data);
    setLoading(false);
  }

  return (
    <div
      className="homeBlock"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${backDrop}")`,
      }}
      key={id}
    >
      <div className="homeBlock_container">
        <div className="homeBlock_content">
          <h4>Latest Hits</h4>
          <h1>{title}</h1>
          <div className="homeBlock_details">
            <div className="homeBlock_detail homeBlock_likes">
              <StarIcon />
              <p className="homeBlock_likes--text">{likes}</p>
              <p> | 10</p>
            </div>

            <div className="homeBlock_detail homeBlock_year">
              <p>{year}</p>
            </div>
            <p className="homeBlock_seperator">.</p>
            <div className="homeBlock_detail homeBlock_language">
              <p>{language}</p>
            </div>
            <p className="homeBlock_seperator">.</p>
            <p className="homeBlock_detail homeBlock_genre">
              {animeGenres?.map((genre) => genre.name).join(", ")}
            </p>
          </div>
          <p>{overview}</p>
          <Link to={`/tv/${id}`}>
            <button className="homeBlock_button pointer">Discover</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
