import "./items.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { ImageLink } from "../../App";

export default function Item(props) {
    const [image, setImage] = useState(props.image);

    useEffect(() => {
        const getImage = async () => {
            try {
                const res = await axios.get(ImageLink + '?' + props.image, { responseType: 'arraybuffer', });
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
                // console.log(imageUrl);
                setImage(imageUrl);
            } catch (err) {
                console.log(err);
            }
        }
        getImage();
    }, []);

    return (
        <li
            onClick={props.onClick}
            id={props.id}
            style={{ borderColor: 'black' }}>
            <img src={image} alt={props.alt} />
            <h6>{props.title}</h6>
            <p>{props.description}</p>
        </li>
    )
}