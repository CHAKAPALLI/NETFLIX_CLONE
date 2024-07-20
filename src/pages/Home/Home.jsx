import React from "react";
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import playIcon from '../../assets/play_icon.png';
import infoIcon from '../../assets/info_icon.png';
import TitleCards from "../../components/TitleCards/TitleCards";
import Fotter from "../../components/Fotter/Fotter";


const Home=()=>{
    return(
        <div className="home">
            <Navbar/>
            <div className="hero">
                <img src={hero_banner} alt="" className="banner-img" />
                <div className="hero-caption">
                    <img src={hero_title} alt="" className="caption-img" />
                    <p>Discovering his ties to a secreate ancient order,man living in mordern Istanbul embarks a quest to save the city from a immortal enemy</p>
                    <div className="hero-btns">
                        <button className="btn"><img src={playIcon} alt="" />play</button>
                        <button className="btn darkbtn"><img src={infoIcon} alt="" />More info</button>
                    </div>
                    <TitleCards/>
                </div>
            </div>
            <div className="more-cards">
            <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
            <TitleCards title={"Only on netflix"} category={"popular"}/>
            <TitleCards title={"Upcomming"} category={"upcoming"}/>
            <TitleCards title={"Tops pics for you"} category={"now_playing"}/>
            </div>
            <Fotter/>
        </div>
    )
}

export default Home