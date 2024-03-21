import "./items.css";
import { useSelector } from "react-redux";
import ItemList from "./itemList.jsx";



export default function MainItem() {
    let params = ['electronic', 'watch', 'footwear', 'sunglass', 'kid', 'bag', 'umbrella'];
    const color = useSelector(state => state.themeMode.color);




    return (
        <div style={{ background: `linear-gradient(${color.belowNavbg2},'#ffffff',${color.belowNavbg1})`, maxWidth: '100%' }}>
            {
                params.map((item) => <ItemList parameter={item} />)

            }
        </div>
    );

}