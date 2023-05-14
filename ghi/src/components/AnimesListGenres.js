import React, { useState } from "react";
import "./AnimesListGenres.css";

export default function AnimesListGenre ({
  genre,
  id,
  setSelectedGenres,
  selectedGenres,
  index,
  seeMore
}) {
  const [clicked, setClicked] = useState(false);

  function addGenre() {
    setClicked(true);

    setSelectedGenres([...selectedGenres, id]);

    console.log(selectedGenres.toString());
  }

  function removeGenre() {
    setClicked(false);

    setSelectedGenres(selectedGenres.filter(animeGenre => animeGenre !== id));

    console.log(selectedGenres.toString());
  }

  return (
    <p
      className="pointer animesList__genre"
      style={{
        backgroundColor: clicked && "#2560e9",
        color: clicked && "white",
        display: !seeMore && index > 0 && "none"
      }}
      onClick={!clicked ? () => addGenre() : () => removeGenre()}
    >
      {genre}
    </p>
  )
}

