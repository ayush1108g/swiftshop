import './categories.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';


export default function Categories(props) {
    const location = useLocation();

    const navigate = useNavigate();
    const ProdDivhandler = (event) => {
        const sectionName = event.currentTarget.getAttribute('title');
        navigate(`/page/?search=${sectionName.split(" ").join('+')}&page=1&limit=20&sort=null`);
    }
    return (
        <li onClick={ProdDivhandler} title={props.title}>
            {location.pathname === '/' && <img src={props.image} alt={props.alt} loading='lazy' />}
            <h5>{props.title}</h5>
        </li>
    )
}