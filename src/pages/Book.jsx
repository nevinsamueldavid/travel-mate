import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const destinationPrices = {
  "Goa": 12999,
  "Jaipur": 9499,
  "Kerala": 14299,
  "Paris": 55999
};

function Book() {
  const { user } = useAuth();
  const [myTrips, setMyTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const [formData, setFormData] = useState({
    name: '', email: '', destination: '', startDate: '', travelers: 2, message: ''
  });

  useEffect(() => {
    if (user) {
      const savedTrips = JSON.parse(localStorage.getItem(`travelMateTrips_${user.email}`)) || [];
      setMyTrips(savedTrips);
    } else {
      setMyTrips([]);
    }
  }, [user]);

  useEffect(() => {
    if (formData.destination && formData.travelers > 0) {
      const basePrice = destinationPrices[formData.destination] || 0;
      setTotalCost(basePrice * formData.travelers);
    } else {
      setTotalCost(0);
    }
  }, [formData.destination, formData.travelers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBooking = {
      id: Date.now(),
      destination: formData.destination,
      startDate: formData.startDate,
      travelers: formData.travelers,
      cost: totalCost
    };

    if (user) {
      const existingTrips = JSON.parse(localStorage.getItem(`travelMateTrips_${user.email}`)) || [];
      const updatedTrips = [...existingTrips, newBooking];
      localStorage.setItem(`travelMateTrips_${user.email}`, JSON.stringify(updatedTrips));
      setMyTrips(updatedTrips);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', destination: '', startDate: '', travelers: 2, message: '' });
  };

  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">Book</p>
          <h1>Request your trip</h1>
          <p className="lead page-lead">
            {user ? `Welcome, ${user.name}. Book a new trip or view your history below.` : "Submit your details for a confirmation summary."}
          </p>
        </div>
      </section>

      <section id="contact" className="section section-alt">
        <div className="container contact-grid">
          <div className="contact-copy">
            <h2>Book Your Trip</h2>
            <p>Share travel details and get a confirmation summary right away.</p>
            {totalCost > 0 && (
              <div style={{ padding: '20px', background: 'var(--brand-2)', color: 'white', borderRadius: '14px', marginTop: '20px' }}>
                <h3 style={{ margin: '0 0 5px' }}>Live Estimate</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>₹{totalCost.toLocaleString('en-IN')}</p>
              </div>
            )}
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              {!user && (
                <>
                  <div className="form-row">
                    <label htmlFor="name">Full name</label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                  </div>
                </>
              )}
              
              <div className="form-row">
                <label htmlFor="destination">Destination</label>
                <select id="destination" name="destination" required value={formData.destination} onChange={handleChange}>
                  <option value="" disabled>Select a destination</option>
                  <option value="Goa">Goa</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Paris">Paris</option>
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="startDate">Start date</label>
                <input id="startDate" name="startDate" type="date" required value={formData.startDate} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label htmlFor="travelers">Travelers</label>
                <input id="travelers" name="travelers" type="number" min="1" max="8" value={formData.travelers} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label htmlFor="message">Trip notes (optional)</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
              </div>

              <button className="btn btn-primary btn-block" type="submit">Confirm Booking</button>
            </form>
          </div>
        </div>
      </section>

      {user && (
        <section id="booking-history" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Your Booking History</h2>
              <p>All trips tied to {user.email}</p>
            </div>
            
            {myTrips.length > 0 ? (
              <div className="cards-grid">
                {myTrips.map(trip => (
                  <div key={trip.id} className="destination-card" style={{padding: '20px'}}>
                    <h3 style={{margin: '0 0 10px'}}>{trip.destination}</h3>
                    <p style={{margin: '5px 0'}}><strong>Date:</strong> {trip.startDate}</p>
                    <p style={{margin: '5px 0'}}><strong>Travelers:</strong> {trip.travelers}</p>
                    <p style={{margin: '10px 0 0', color: 'var(--brand-2)', fontWeight: 'bold'}}>₹{trip.cost.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="form-card" style={{textAlign: 'center', padding: '40px'}}>
                <p>No trips booked yet. Use the form above to start!</p>
              </div>
            )}
          </div>
        </section>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-backdrop" onClick={closeModal}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Booking Confirmed!</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Your trip to <strong>{formData.destination}</strong> is locked in.</p>
              {user ? <p style={{color: 'var(--brand-2)'}}>Saved to your bookings below.</p> : <p>Guest booking (not saved).</p>}
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={closeModal}>Done</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Book;