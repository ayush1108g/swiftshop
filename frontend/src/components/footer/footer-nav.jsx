import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

export default function A() {
  return (<div className="footer-nav">
    <div className="container">
      <ul className="footer-nav-list">
        <li className="footer-nav-item">
          <h2 className="nav-title">Popular Categories</h2>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Fashion</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Electronic</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Cosmetic</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Health</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Watches</li>
        </li>
      </ul>
      <ul className="footer-nav-list">
        <li className="footer-nav-item">
          <h2 className="nav-title">Products</h2>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Prices drop</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">New products</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Best sales</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Contact us</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Sitemap</li>
        </li>
      </ul>
      <ul className="footer-nav-list">
        <li className="footer-nav-item">
          <h2 className="nav-title">Our Company</h2>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Delivery</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Legal Notice</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Terms and conditions</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">About us</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Secure payment</li>
        </li>
      </ul>
      <ul className="footer-nav-list">
        <li className="footer-nav-item">
          <h2 className="nav-title">Services</h2>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Prices drop</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">New products</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Best sales</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Contact us</li>
        </li>
        <li className="footer-nav-item">
          <li className="footer-nav-link">Sitemap</li>
        </li>
      </ul>
      <ul className="footer-nav-list">
        <li className="footer-nav-item">
          <h2 className="nav-title">Contact</h2>
        </li>
        <li className="footer-nav-item flex">
          <div className="icon-box">
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <address className="content">
            561 HAL Old Airport Rd, Murugeshpalya, Bengaluru, Karnataka 560017
          </address>
        </li>
        <li className="footer-nav-item flex">
          <div className="icon-box">
            <ion-icon name="call-outline"></ion-icon>
          </div>
          <li href="tel:8446590015" className="footer-nav-link">8446590015</li>
        </li>
        <li className="footer-nav-item flex">
          <div className="icon-box">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          <li href="mailto:divyakumar768800@gmail.com" className="footer-nav-link">divyakumar768800@gmail.com</li>
        </li>
      </ul>
    </div>
  </div>);
}