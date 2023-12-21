import AyushBW from "../store/AyushPhoto-removebg-bw.png";
import Ayush from "../store/AyushPhoto-removebg-color.png";
import DivyaBW from "../store/Divya-removebg-bw.png";
import Divya from "../store/Divya-removebg-color.png";
import PushkarBW from "../store/Pushkar-removebg-bw.png";
import Pushkar from "../store/Pushkar-removebg-color.png";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import { useState } from "react";
import data from "../store/data";

const TeamPage = () => {
    const [isHoveredAyush, setIsHoveredAyush] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const handleMouseEnter1 = () => {
        setIsHoveredAyush(true);
    };
    const handleMouseLeave1 = () => {
        setIsHoveredAyush(false);
    };
    const handleMouseEnter2 = () => {
        setIsHovered2(true);
    };
    const handleMouseLeave2 = () => {
        setIsHovered2(false);
    };
    const handleMouseEnter3 = () => {
        setIsHovered3(true);
    }
    const handleMouseLeave3 = () => {
        setIsHovered3(false);
    }

    return (
        <div>
            <div style={{ width: '100vw', height: '5vh' }}></div>
            <div className="h2 d-flex justify-content-center">Our Team</div>
            <br /> <br />
            <div className="d-flex flex-row justify-content-around align-item-center">
                <div className="d-flex flex-column justify-content-center" style={{ gap: '1vw' }}>
                    <img
                        src={isHoveredAyush ? Ayush : AyushBW}
                        alt="Ayush"
                        className="img-fluid rounded"
                        onMouseEnter={handleMouseEnter1}
                        onMouseLeave={handleMouseLeave1}
                        style={{ height: "25vw", width: "20vw" }}
                    />
                    <div className="h3 d-flex justify-content-center">Ayush Gupta</div>
                    <div className="h3 d-flex justify-content-center" style={{ color: 'grey' }}>Frontend Developer</div>
                    <div className="h3 d-flex flex-row justify-content-center" style={{ gap: '2vw' }}>
                        <a href={data.ayush.linkedin} target="_blank" rel="noreferrer" > <CiLinkedin style={{ fontSize: '3vh' }} /></a>
                        <a href={data.ayush.instagram} target="_blank" rel="noreferrer"><FaInstagram style={{ fontSize: '3vh' }} /></a>
                        <a href={`mailto:${data.ayush.email}`}><SiGmail style={{ fontSize: '3vh' }} /></a>
                        <a href={data.ayush.github} target="_blank" rel="noreferrer"> <FaGithub style={{ fontSize: '3vh' }} /></a>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center" style={{ gap: '1vw' }}>
                    <img
                        src={isHovered3 ? Pushkar : PushkarBW}
                        alt="Ayush"
                        className="img-fluid rounded"
                        onMouseEnter={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                        style={{ height: "25vw", width: "20vw" }}
                    />
                    <div className="h3 d-flex justify-content-center">Pushkar Gupta</div>
                    <div className="h3 d-flex justify-content-center" style={{ color: 'grey' }}>Backend Developer</div>
                    <div className="h3 d-flex flex-row justify-content-center" style={{ gap: '2vw' }}>
                        <a href={data.pushkar.linkedin} target="_blank" rel="noreferrer" > <CiLinkedin style={{ fontSize: '3vh' }} /></a>
                        <a href={data.pushkar.instagram} target="_blank" rel="noreferrer"><FaInstagram style={{ fontSize: '3vh' }} /></a>
                        <a href={`mailto:${data.pushkar.email}`}><SiGmail style={{ fontSize: '3vh' }} /></a>
                        <a href={data.pushkar.github} target="_blank" rel="noreferrer"> <FaGithub style={{ fontSize: '3vh' }} /></a>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center " style={{ gap: '1vw' }}>
                    <img
                        src={isHovered2 ? Divya : DivyaBW}
                        alt="Divya"
                        className="img-fluid rounded"
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                        style={{ height: "25vw", width: "20vw" }}
                    />
                    <div className="h3 d-flex justify-content-center">Divya Kumar</div>
                    <div className="h3 d-flex justify-content-center" style={{ color: 'grey' }}>Frontend Developer</div>
                    <div className="h3 d-flex flex-row justify-content-center" style={{ gap: '2vw' }}>
                        <a href={data.divya.linkedin} target="_blank" rel="noreferrer" > <CiLinkedin style={{ fontSize: '3vh' }} /></a>
                        <a href={data.divya.instagram} target="_blank" rel="noreferrer"><FaInstagram style={{ fontSize: '3vh' }} /></a>
                        <a href={`mailto:${data.divya.email}`}><SiGmail style={{ fontSize: '3vh' }} /></a>
                        <a href={data.divya.github} target="_blank" rel="noreferrer"> <FaGithub style={{ fontSize: '3vh' }} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default TeamPage;