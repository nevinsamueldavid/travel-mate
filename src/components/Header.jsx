import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Header({ toggleTheme, isLightMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, deleteAccount } = useAuth(); 

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const getNavClass = (path) => {
    return location.pathname === path ? "nav-link active-link" : "nav-link";
  };

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">✈️</span>
          <span className="brand-name">Travel Mate</span>
        </Link>
        
        <nav className="nav-links" aria-label="Primary navigation">
          <Link className={getNavClass("/")} to="/">Home</Link>
          <Link className={getNavClass("/destinations")} to="/destinations">Destinations</Link>
          <Link className={getNavClass("/services")} to="/services">Services</Link>
          <Link className={getNavClass("/book")} to="/book">Book</Link>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
              <span style={{ color: 'var(--brand-2)', fontWeight: 'bold', marginRight: '5px' }}>
                Hi, {user.name}
              </span>
              <button onClick={logout} className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: '13px' }}>
                Log Out
              </button>
              <button onClick={deleteAccount} className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: '13px', color: '#ef4444', borderColor: '#ef4444' }}>
                Delete Account
              </button>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/login" style={{ padding: '6px 16px', marginLeft: '10px' }}>
              Log In
            </Link>
          )}
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {isLightMode ? '🌙' : '☀️'}
          </button>
        </nav>
        
        <button className="menu-btn" type="button" onClick={toggleMenu}>
          <span className="menu-icon" aria-hidden="true"></span>
        </button>
      </div>

      {menuOpen && (
        <div id="mobileMenu" className="mobile-menu">
          <div className="container mobile-menu-inner">
            <nav className="mobile-nav">
              <Link className="mobile-nav-link" to="/" onClick={closeMenu}>Home</Link>
              <Link className="mobile-nav-link" to="/destinations" onClick={closeMenu}>Destinations</Link>
              <Link className="mobile-nav-link" to="/book" onClick={closeMenu}>Book</Link>
              
              {user ? (
                <>
                  <span className="mobile-nav-link" style={{ color: 'var(--brand-2)' }}>Hi, {user.name}</span>
                  <button className="mobile-nav-link" onClick={() => { logout(); closeMenu(); }} style={{textAlign: 'left', background: 'transparent', border: 'none'}}>Log Out</button>
                  <button className="mobile-nav-link" onClick={() => { deleteAccount(); closeMenu(); }} style={{textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444'}}>Delete Account</button>
                </>
              ) : (
                <Link className="mobile-nav-link" to="/login" onClick={closeMenu}>Log In</Link>
              )}
              
              <button className="mobile-nav-link" onClick={toggleTheme} style={{textAlign: 'left', background: 'transparent', border: 'none'}}>
                Toggle Theme {isLightMode ? '🌙' : '☀️'}
              </button>
            </nav>
            <button className="mobile-close" type="button" onClick={closeMenu}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;