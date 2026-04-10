import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  // Set to false so the Login screen is the default view
  const [isSignUp, setIsSignUp] = useState(false); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      signup(formData.name, formData.email, formData.password);
      navigate('/book'); // Redirect straight to booking after signup
    } else {
      const success = login(formData.email, formData.password);
      if (success) {
        navigate('/book'); // Redirect straight to booking after login
      } else {
        setErrorMsg('Invalid email or password');
      }
    }
  };

  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container" style={{ maxWidth: '400px' }}>
          <h1 style={{ textAlign: 'center' }}>
            {isSignUp ? 'Create Account' : 'Log In'}
          </h1>
          
          <div className="form-card" style={{ marginTop: '30px' }}>
            {errorMsg && (
              <div style={{ color: 'white', backgroundColor: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="form-row">
                  <label htmlFor="name">First Name</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} />
                </div>
              )}
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
              </div>
              
              <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: '15px' }}>
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--muted)' }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }}
                style={{ background: 'none', border: 'none', color: 'var(--brand-2)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;