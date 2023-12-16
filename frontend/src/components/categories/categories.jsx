import './categories.css';
import { useLocation } from 'react-router';
export default function Categories(props) {
    const location = useLocation();
    console.log(location);
    return (
        <li>
            {location.pathname === '/' && <img src={props.image} alt={props.alt} />}
            <h5>{props.title}</h5>
        </li>
    )
}