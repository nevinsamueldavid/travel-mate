import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch only the trips belonging to the logged-in user
    if (user) {
      const savedTrips = JSON.parse(localStorage.getItem(`travelMateTrips_${user.email}`)) || [];
      setTrips(savedTrips);
    }
  }, [user]);

  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">Dashboard</p>
          <h1>My Trips</h1>
          <p className="lead page-lead">Manage your upcoming adventures, {user?.name}.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          {trips.length > 0 ? (
            <div className="cards-grid">
              {trips.map(trip => (
                <div key={trip.id} className="form-card" style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 10px', color: 'var(--brand-2)' }}>{trip.destination}</h3>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Date:</strong> {trip.startDate}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Travelers:</strong> {trip.travelers}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Total Estimated:</strong> ₹{trip.cost.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="form-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3>You have no upcoming trips!</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Ready to plan your next escape?</p>
              <Link to="/destinations" className="btn btn-primary">Find a Destination</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;