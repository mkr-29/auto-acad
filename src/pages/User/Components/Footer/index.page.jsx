import React from "react";
import "./Footer.scss";
import {ReactComponent as AutoAcadLogo} from "../../../../assets/Logo/AutoAcadLogo.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <p>HEARD ENOUGH? →</p>
        <h3>Contact Us</h3>
        <button>→</button>
      </div>
      <div className="footer-bottom">
        <AutoAcadLogo />
        <div className="footer-bottom-mid">
          <h4>AUTOACAD</h4>
          <a href="mailto:mayank.k9802@gmail.com">mayank.k9802@gmail.com</a>
          <a href="tel:+917900464619">+91 7900464619</a>
          <div>
            <p>JUIT, Waknaghat, HP</p>
            <p>India, 173234</p>
          </div>
        </div>
        <div className="footer-bottom-right">
          <p>Subscribe for Updates</p>
          <div className="footer-bottom-right-subscribe">
            <div>
              <input type="email" placeholder="Email Address" />
              <button>→</button>
            </div>
            <p>FOLLOW US</p>
            <div className="footer-bottom-right-subscribe-socials">
              <a href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
