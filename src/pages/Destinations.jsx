import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const destinationData = [
  { id: 1, title: 'Goa', desc: 'Beaches, nightlife, and Portuguese flavors.', price: 12999, type: 'Family-friendly', tags: ['domestic', 'beach'], img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Jaipur', desc: 'History, forts, and royal street food.', price: 9499, type: 'Culture', tags: ['domestic', 'culture'], img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Kerala', desc: 'Backwaters, houseboats, and serene stays.', price: 14299, type: 'Relax', tags: ['domestic', 'relax'], img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Paris', desc: 'Art, cafes, and iconic landmarks.', price: 55999, type: 'Romance', tags: ['international', 'culture'], img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop' }
];

function Destinations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('travelMateWishlist'));
    if (savedWishlist) setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (id) => {
    let updatedWishlist;
    if (wishlist.includes(id)) {
      updatedWishlist = wishlist.filter(itemId => itemId !== id);
    } else {
      updatedWishlist = [...wishlist, id];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('travelMateWishlist', JSON.stringify(updatedWishlist));
  };

  // 1. Filter by Category
  let processedData = activeFilter === 'all' 
    ? destinationData 
    : destinationData.filter(d => d.tags.includes(activeFilter));

  // 2. Filter by Search Query
  if (searchQuery) {
    processedData = processedData.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 3. Sort by Price
  if (sortOrder === 'low') {
    processedData.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high') {
    processedData.sort((a, b) => b.price - a.price);
  }

  return (
    <main id="main" className="page-main" tabIndex="-1">
      <section className="section page-intro">
        <div className="container">
          <p className="eyebrow">Destinations</p>
          <h1>Popular places to explore</h1>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          
          {/* SEARCH AND SORT CONTROLS */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: '1', minWidth: '200px', padding: '10px 14px', borderRadius: '12px' }}
            />
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '12px' }}
            >
              <option value="default">Sort by: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="filter-bar" role="group">
            {['all', 'domestic', 'international', 'beach', 'culture'].map(filter => (
              <button 
                key={filter}
                type="button" 
                className={`filter-chip ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="cards-grid" style={{ marginTop: '20px' }}>
            {processedData.length > 0 ? processedData.map(dest => (
              <article key={dest.id} className="destination-card">
                <div className="destination-media" style={{ backgroundImage: `url(${dest.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="destination-body">
                  <h3>{dest.title}</h3>
                  <p>{dest.desc}</p>
                  <div className="destination-meta">
                    <span>From ₹{dest.price.toLocaleString('en-IN')}</span>
                    <span className="dot" aria-hidden="true"></span>
                    <span>{dest.type}</span>
                  </div>
                  <button className={`wishlist-btn ${wishlist.includes(dest.id) ? 'saved' : ''}`} onClick={() => toggleWishlist(dest.id)}>
                    {wishlist.includes(dest.id) ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
                  </button>
                </div>
              </article>
            )) : (
              <p>No destinations found matching your search.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Destinations;