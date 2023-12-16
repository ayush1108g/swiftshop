import "bootstrap/dist/css/bootstrap.min.css";
import FooterBottom from "./footer-bottom";
import FooterCategories from "./footer-categories";
import FooterNav from "./footer-nav";
import FooterContact from "./footer-contact";

export default function MainFooter(){
    return(
        <footer id="footer">
            <FooterCategories></FooterCategories>
            <FooterNav></FooterNav>
            <FooterContact></FooterContact>
            <FooterBottom></FooterBottom>
        </footer>
    );
}