import "./items.css"

export default function Item(props) {
    return (
        <li
            onClick={props.onClick}
            id={props.id}
            style={{ borderColor: 'black' }}>
            <img src={props.image} alt={props.alt} />
            <h6>{props.title}</h6>
            <p>{props.description}</p>
        </li>
    )
}