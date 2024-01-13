
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import { useState } from "react";
import data from "../store/data";
import TypeDynamic from './../components/dynamicType';

const TeamPage = () => {
    const [isHovered, setIsHovered] = useState(Array(data.length).fill(false));

    const handleMouseEnter = (index) => {
        const newHoveredState = [...isHovered];
        newHoveredState[index] = true;
        setIsHovered(newHoveredState);
    };

    const handleMouseLeave = (index) => {
        const newHoveredState = [...isHovered];
        newHoveredState[index] = false;
        setIsHovered(newHoveredState);
    };


    return (
        <div>
            <div style={{ width: '100vw', height: '5vh' }}></div>
            <div className="h2 d-flex justify-content-center"><TypeDynamic textToType="Our Team" duration='800' isBold='true' /></div>
            <br /> <br />
            <div className="d-flex flex-row justify-content-around align-item-center">

                {
                    data.map((item, index) => {
                        return (<div className="d-flex flex-column justify-content-center" style={{ gap: '1vw' }}>
                            <img
                                src={isHovered[index] ? item.image : item.imageBW}
                                alt={item.name}
                                className="img-fluid rounded"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                style={{ height: "25vw", width: "20vw" }}
                            />
                            <div className="h3 d-flex justify-content-center"><TypeDynamic textToType={item.name} isBold='true' duration='1000' /></div>
                            <div className="h3 d-flex justify-content-center" style={{ color: 'grey' }}>{item.role}</div>
                            <div className="h3 d-flex flex-row justify-content-center" style={{ gap: '2vw' }}>
                                <a href={item.linkedin} target="_blank" rel="noreferrer" > <CiLinkedin style={{ fontSize: '3vh' }} /></a>
                                <a href={item.instagram} target="_blank" rel="noreferrer"><FaInstagram style={{ fontSize: '3vh' }} /></a>
                                <a href={`mailto:${item.email}`}><SiGmail style={{ fontSize: '3vh' }} /></a>
                                <a href={item.github} target="_blank" rel="noreferrer"> <FaGithub style={{ fontSize: '3vh' }} /></a>
                            </div>
                        </div>)
                    })
                }
                {/* <div className="d-flex flex-column justify-content-center" style={{ gap: '1vw' }}>
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
            </div>*/}

            </div>
        </div>
    )
};
export default TeamPage;