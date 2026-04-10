import { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-cols">
        <div className="footer-col footer-brand-block">
          <div className="footer-brand">Travel Mate</div>
          <p className="footer-tagline">Professional trip planning for individuals, families, and small teams.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Email for travel tips" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary newsletter-btn" type="submit">Subscribe</button>
          </form>
          {subscribed && <p className="newsletter-thanks">Thanks — we’ll send updates (demo only).</p>}
        </div>
        <div className="footer-col">
          <div className="footer-heading">Explore</div>
          <Link to="/destinations">Destinations</Link>
          <Link to="/services">Services</Link>
          <Link to="/process">Process</Link>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Company</div>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/book">Book</Link>
        </div>
        <div className="footer-col">
          <div className="footer-heading">Legal</div>
          <a href="#">Privacy (demo)</a>
          <a href="#">Terms (demo)</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Travel Mate. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;