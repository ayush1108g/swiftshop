import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./footer.module.css";

export default function FooterBottom() {
  return (
    <div className={classes["footer-bottom"]}>
      <div className={classes.container}>
        <img src="https://codewithsadee.github.io/anon-ecommerce-website/assets/images/payment.png" alt="payment method"
          className={classes["payment-img"]} loading="lazy" />
        <p className={classes.copyright}>
          Copyright &copy; <span className={classes.footerNavLink}>EduTech</span> all rights reserved.
        </p>
      </div>
    </div>);
}