import React, { useEffect, useState } from "react";
import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [apidata, setApidata] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmU3NTA3ZTMyYzc3YmU2YjRkMTA5NDJhMTdiMmVmMiIsIm5iZiI6MTcyMDY3NzM5Mi42NTkzNDcsInN1YiI6IjY2OGY3MzA0OGUzOWM5YzlmMjEwZWNlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1uyMH139sNub_EsfOoWIGzjcDN_y4uBIH1Qb6hcP6Sw'
        }
    };

    useEffect(() => {
        console.log(`Fetching video for movie ID: ${id}`); // Debugging line
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                console.log('API response:', response); // Debugging line
                if (response.results && response.results.length > 0) {
                    setApidata(response.results[0]);
                } else {
                    console.error('No videos found for this movie.');
                }
            })
            .catch(err => console.error('Error fetching data:', err));
    }, [id]);

    return (
        <div className="player">
            <img src={back_arrow} alt="Back Arrow" onClick={() => { navigate('/') }} />
            {apidata.key ? (
                <iframe
                    width='90%'
                    height='90%'
                    src={`https://www.youtube.com/embed/${apidata.key}`}
                    title='trailer'
                    frameBorder='0'
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Loading video...</p>
            )}
            <div className="player-info">
                <p>{apidata.published_at ? apidata.published_at.slice(0, 10) : ''}</p>
                <p>{apidata.name}</p>
                <p>{apidata.type}</p>
            </div>
        </div>
    );
}

export default Player;
