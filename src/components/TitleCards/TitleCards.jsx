import React, { useEffect, useRef, useState } from "react";
import './TitleCards.css';
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmU3NTA3ZTMyYzc3YmU2YjRkMTA5NDJhMTdiMmVmMiIsIm5iZiI6MTcyMDY3NzM5Mi42NTkzNDcsInN1YiI6IjY2OGY3MzA0OGUzOWM5YzlmMjEwZWNlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1uyMH139sNub_EsfOoWIGzjcDN_y4uBIH1Qb6hcP6Sw'
            }
        };

        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setApiData(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();

        const handleWheel = (event) => {
            event.preventDefault();
            cardsRef.current.scrollLeft += event.deltaY;
        };

        if (cardsRef.current) {
            cardsRef.current.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (cardsRef.current) {
                cardsRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, [category]);

    console.log('apiData:', apiData);

    return (
        <div className="titlecards">
            <h2>{title || "Popular on Netflix"}</h2>
            <div className="card_list" ref={cardsRef}>
                {apiData.map((card, index) => (
                    <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
                        <p>{card.original_title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TitleCards;
