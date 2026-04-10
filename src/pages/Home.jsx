import { Link } from 'react-router-dom';

function Home() {
  return (
    <main id="main" tabIndex="-1">
      <div className="trust-bar" aria-label="Trust indicators">
        <div className="container trust-bar-inner">
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">✓</span>
            <span>Verified travel listings</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">🔒</span>
            <span>Secure browsing & data care</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">⏱</span>
            <span>Typical reply within 24 hours</span>
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Travel smarter. Explore more.</p>
            <h1>Find your next escape with Travel Mate.</h1>
            <p className="lead">
              Discover amazing destinations, compare trip ideas, and book in minutes.
              Built for stress-free planning.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/destinations">Explore Destinations</Link>
              <Link className="btn btn-ghost" to="/book">Plan a Trip</Link>
            </div>

            <ul className="hero-benefits" aria-label="Highlights">
              <li>Curated routes</li>
              <li>Local experiences</li>
              <li>Fast booking</li>
            </ul>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card">
              <div className="hero-card-top">
                <span className="pill">Today’s Pick</span>
                <span className="rate">4.8 ★</span>
              </div>
              <h2 className="hero-card-title">Santorini, Greece</h2>
              <p className="hero-card-text">Sunset views, white streets, and sea breezes.</p>
              <div className="hero-card-tags">
                <span className="tag">3 nights</span>
                <span className="tag">Romantic</span>
                <span className="tag">Food tour</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;