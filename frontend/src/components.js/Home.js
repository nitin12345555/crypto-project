import React, { useRef } from "react";
import PhoneGraphImage from "../assets/Phone.png";
import GoogleStoreImage from "../assets/Google.png";
import AppStoreImage from "../assets/App.png";
import Pricing from "./Price";
import Work from "./Work";
import Support from "./support";
import { useAppContext } from "../context/AppContext";
import "../all css/contact.css";

const Home = () => {
  const { user, logout } = useAppContext();
  const pricingRef = useRef(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div className="grid-container">
        <div className="grid-item-left">
          <h3 className="crpto">Crypto On The Go</h3>
          <ul className="about-crypto">
            <li className="buysee">Buy & See</li>
            <li className="live">Live Chart</li>
            <li className="crypto-currency">of Crypto Currency.</li>
          </ul>

          <div className="buttons">
            <button className="Chart" onClick={scrollToPricing}>
              View Chart
            </button>
          </div>

          {/* ✅ Show username if logged in */}
          {user ? (
            <div style={{ marginTop: "20px", color: "white" }}>
              <h2>Welcome, {user.name} 👋</h2>
              <button onClick={logout} className="logout">Logout</button>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <a href="/">Login</a> | <a href="/signup">Sign Up</a>
            </div>
          )}

          <div className="stores">
            <img src={GoogleStoreImage} alt="Google-Play" className="Google-store" />
            <img src={AppStoreImage} alt="App-Store" className="App-Store" />
          </div>
        </div>

        <div className="grid-item-left">
          <img src={PhoneGraphImage} className="Phone-Graph" alt="Phone Graph" />
        </div>
      </div>

      <div className="pricing-section-wrapper">
        <Pricing ref={pricingRef} />
      </div>

      <div className="work-section-wrapper">
        <Work />
      </div>

      <div className="support-section-wrapper">
        <Support />
      </div>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-contact">📧 Email: nitinjangidj92@gmail.com</p>
          <p className="footer-contact">📞 Phone: +91 95888 45001</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
