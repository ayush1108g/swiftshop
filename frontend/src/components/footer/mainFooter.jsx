import "bootstrap/dist/css/bootstrap.min.css";
import FooterBottom from "./footer-bottom";
import FooterCategories from "./footer-categories";
import { useSelector } from "react-redux";
export default function MainFooter() {
    const color = useSelector((state) => state.themeMode.color);
    return (
        <footer id="footer" style={{ backgroundColor: color.footerbg }}>
            <FooterCategories></FooterCategories>
            <FooterBottom></FooterBottom>
        </footer>
    );
}