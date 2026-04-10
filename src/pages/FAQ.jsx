import { Link } from 'react-router-dom';

function FAQ() {
  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h1>Questions & answers</h1>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="faq-list">
            <details className="faq-item">
              <summary>Do you handle international visas and documents?</summary>
              <p>We provide checklists and guidance. Visa processing is handled by you.</p>
            </details>
            <details className="faq-item">
              <summary>What is included in the trip quote?</summary>
              <p>Quotes typically outline stays, transfers, and major inclusions.</p>
            </details>
            <details className="faq-item">
              <summary>Can I change dates after requesting a booking?</summary>
              <p>Yes, in most cases. Share new dates as early as possible.</p>
            </details>
          </div>
          <div className="cta-row cta-row-spaced-lg">
            <p className="cta-text">Still unsure?</p>
            <Link className="btn btn-primary" to="/book">Contact us via booking</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQ;