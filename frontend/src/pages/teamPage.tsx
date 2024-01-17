import * as React from 'react';
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import { useState } from "react";
import data from "../store/data.ts";
import TypeDynamic from '../components/dynamicType';
import { useSelector } from "react-redux";
import { RootState } from "../store/utils/index.ts";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    imageBW: string;
    linkedin: string;
    instagram: string;
    email: string;
    github: string;
  }

const TeamPage : React.FC = () => {
    const color = useSelector((state:RootState )=> state.themeMode.color);
    const [isHovered, setIsHovered] = useState<boolean[]>(Array(data.length).fill(false));

    const handleMouseEnter = (index : number) => {
        const newHoveredState = [...isHovered];
        newHoveredState[index] = true;
        setIsHovered(newHoveredState);
    };

    const handleMouseLeave = (index : number) => {
        const newHoveredState = [...isHovered];
        newHoveredState[index] = false;
        setIsHovered(newHoveredState);
    };


    return (
        <div className="d-flex justify-content-center align-items-center flex-column " style={{ paddingBottom: '5vh', maxWidth: '100%', backgroundColor: color.belowNavbg2 }}>
            <div style={{ width: '100vw', height: '5vh' }}></div>
            <div className="h2 d-flex justify-content-center"><TypeDynamic textToType="Our Team" duration='800' isBold='true' /></div>
            <br /> <br />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '20px', backgroundColor: color.belowNavbg2
            }}>

                {
                    data.map((item:TeamMember, index:number) => {
                        return (<div className="d-flex flex-column justify-content-center align-items-center" style={{ gap: '1vw', border: '1px solid black', padding: '5px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)' }}>
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
            </div>
        </div>
    )
};
export default TeamPage;