import { Link } from 'react-router-dom';

function Process() {
  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">Process</p>
          <h1>From idea to itinerary</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ol className="steps">
            <li className="step">
              <span className="step-num">1</span>
              <div className="step-body">
                <h3>Share your trip</h3>
                <p>Tell us destination, dates, travelers, and any must-haves.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-num">2</span>
              <div className="step-body">
                <h3>Get options</h3>
                <p>We suggest routes, stays, and activities that fit your style.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-num">3</span>
              <div className="step-body">
                <h3>Confirm & prep</h3>
                <p>Lock details, receive your summary, and use our checklist.</p>
              </div>
            </li>
          </ol>
          <div className="cta-row cta-row-spaced-lg">
            <p className="cta-text">Take step one now</p>
            <Link className="btn btn-primary" to="/book">Open booking form</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Process;