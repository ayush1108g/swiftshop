import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./footer.css";

export default function A() {
  return (<div className="cm1">
    {/* <a href="https://www.instagram.com/divya_kumar_5161/" className="fa fa-instagram" target="_blank"></a>
    <a href="https://www.linkedin.com/in/divya-kumar-87a845265/" className="fa fa-linkedin" target="_blank"></a>
    <a href="https://github.com/Divyakumar6163" className="fa fa-github" target="_blank"></a>
    <a href="https://www.facebook.com/profile.php?id=100021862485292" className="fa fa-facebook" target="_blank"></a> */}
    {/* <a href="mailto:divyakumar768800@gmail.com" target="_blank" className="fa fa-google"></a> */}
    <FontAwesomeIcon icon={faEnvelope} />
    {/* <i className="bi bi-twitter"></i> */}
  </div>);
}