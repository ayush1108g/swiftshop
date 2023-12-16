import './categories.css';
export default function(props){
    return(
        <li>
            <img src={props.image} alt="" />
            <h6>{props.title}</h6>
        </li>
    )
}