function About() {
  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Why Travel Mate</h1>
          <p className="lead page-lead">We focus on clear communication, curated options, and plans that match how you travel.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container about-grid">
          <div className="about-copy">
            <h2>About Travel Mate</h2>
            <p>Travel Mate helps you plan trips with simple, modern booking. Tell us what you want and we’ll guide you to a great itinerary.</p>
            <div className="about-points">
              <div className="point">
                <h3>Fast & clear</h3>
                <p>Simple forms, quick confirmation, and fewer surprises.</p>
              </div>
              <div className="point">
                <h3>Smart suggestions</h3>
                <p>Routes based on destination type and trip style.</p>
              </div>
              <div className="point">
                <h3>Made for groups</h3>
                <p>Plan for 1 to 8 travelers with ease.</p>
              </div>
            </div>
          </div>
          <aside className="about-stats">
            <div className="stat"><div className="stat-num">1k+</div><div className="stat-label">Bookings</div></div>
            <div className="stat"><div className="stat-num">120+</div><div className="stat-label">Destinations</div></div>
            <div className="stat"><div className="stat-num">4.8/5</div><div className="stat-label">Customer rating</div></div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default About;