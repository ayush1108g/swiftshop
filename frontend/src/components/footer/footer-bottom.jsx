import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

export default function FooterBottom() {
  return (
    <div className="footer-bottom">
      <div className="container">
        <img src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/payment.png" alt="payment method"
          className="payment-img" />
        <p className="copyright">
          Copyright &copy; <a href="#">Divya Kumar</a> all rights reserved.
        </p>
      </div>
    </div>);
}