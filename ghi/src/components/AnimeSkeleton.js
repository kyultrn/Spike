import React from "react";
import "./Anime.css";
import "./Skelton.css";

export default function AnimeSkeleton() {
    return (
        <figure className="anime">
            <div className="skeleton anime__skeleton"></div>
        </figure>
    );
}
