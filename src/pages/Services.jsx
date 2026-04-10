import { Link } from 'react-router-dom';

function Services() {
  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1>How we support your trips</h1>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="services-grid">
            <article className="service-card">
              <h3>Corporate & offsites</h3>
              <p>Streamlined itineraries, vendor coordination, and clear cost breakdowns for teams.</p>
            </article>
            <article className="service-card">
              <h3>Custom packages</h3>
              <p>Tailored routes by budget, season, and pace—domestic and international.</p>
            </article>
            <article className="service-card">
              <h3>Local experiences</h3>
              <p>Food walks, heritage tours, and hand-picked stays that match your preferences.</p>
            </article>
            <article className="service-card">
              <h3>Trip support</h3>
              <p>Itinerary adjustments, document checklists, and a single point of contact before you travel.</p>
            </article>
          </div>
          <div className="cta-row cta-row-spaced">
            <p className="cta-text">Ready to talk dates?</p>
            <Link className="btn btn-primary" to="/book">Start a booking</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;