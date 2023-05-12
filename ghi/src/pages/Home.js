
import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Home({ availableGenres }) {
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
  const [animeData, setAnimeData] = useState([]);
  const [showsData, setShowsData] = useState([]);

  async function getTopAnimes() {
    const url = "https://api.consumet.org/anime/gogoanime/top-airing";
    const data = async () => {
        try {
            const { data } = await axios.get(url, { params: { page: 1 } });
            return data
        } catch (err) {
            throw new Error(err.message);
        }
    }
    const animes = data.results
    setAnimeData(animes);
  }

  useEffect(() => {
    Promise.all([getTopAnimes()]);
    setTimeout(() => {
        setLoading(false)
    }, 500);
  }, []);

  return (
    <div>
        hi
    </div>
  );
}
