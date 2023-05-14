import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimeSkeleton from "./AnimeSkeleton.js";
import "./AnimesList.css";
import AnimesListGenre from "./AnimesListGenres.js";
import "./AnimesListGenres.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { KeyboardArrowUp } from "@mui/icons-material";

export default function AnimesList ({
    listItems,
    text,
    home,
    genres,
    loading,
    searchMade,
    animes,
    setSelectedGenres,
    selectedGenres,
    amountOfAnimes
}) {
    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className="animesList">
            <div className="container animesList__container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
                <div className="row animesList__row">
                    {!searchMade && (
                        <div
                            className="animesList__top"
                            style={{ flexDirection: !home && "column" }}
                        >
                            <h1>{text}</h1>
                            {home && (
                                <Link to={"/animes"}>
                                    <button className="animesList__button pointer">
                                        View all
                                    </button>
                                </Link>
                            )}
                            {genres && (
                                <>
                                <div className="animesList__genres animesList__genres1">
                                    {genres?.map((animeGenre) => (
                                        <AnimesListGenre
                                            genre={animeGenre.name}
                                            id={animeGenre.id}
                                            key={animeGenre.id}
                                            setSelectedGenres={setSelectedGenres}
                                            selectedGenres={selectedGenres}
                                        />
                                    ))}
                                </div>

                                <div className="animesList__genres animesList__genres2">
                                        {genres?.map((animeGenre, index) => (
                                            <AnimesListGenre
                                                genre={animeGenre.name}
                                                id={animeGenre.id}
                                                key={animeGenre.id}
                                                setSelectedGenres={setSelectedGenres}
                                                selectedGenres={selectedGenres}
                                                index={index}
                                                seeMore={seeMore}
                                            />
                                        ))}
                                        {!seeMore ? (
                                            <p
                                                className="animesList__seeMore pointer"
                                                onClick={() => setSeeMore(true)}
                                            >
                                               See More <KeyboardArrowDownIcon />
                                            </p>
                                        ) : (
                                            <p
                                                className="animesList__seeLess pointer"
                                                onClick={() => setSeeMore(false)}
                                            >
                                                See Less <KeyboardArrowUp />
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {
                        <div className="animesList__list">
                            {!loading
                                ? listItems
                                : new Array(amountOfAnimes)
                                    .fill(0)
                                    .map((_, index) => <AnimeSkeleton key={index} />)}
                        </div>
                    }
                    {home && (
                        <Link className="animesList__link" to={"/animes"}>
                            <button className="animesList__button animesList__button2 pointer">
                                View all
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
