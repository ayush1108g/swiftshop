import "./items.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { ImageLink } from "../../App";
import Skeleton from "react-loading-skeleton";

export default function Item(props) {
    const [image, setImage] = useState(props.image);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getImage = async () => {
            try {
                const res = await axios.get(ImageLink + '?' + props.image, { responseType: 'arraybuffer', });
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getImage();
    }, []);
    return (
        <li className="core-conceptsLI"
            onClick={props.onClick}
            id={props.id}
            style={{ borderColor: 'black' }}>
            {image !== props.image && !loading ? <img src={image} alt={props.alt} /> : <Skeleton height={100} width={200} />}
            <h6 style={{ paddingTop: '10px' }}>{props.title}</h6>
            <p>{props.description}</p>
        </li>
    )
}