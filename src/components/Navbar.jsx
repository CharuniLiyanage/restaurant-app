import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      padding: '15px',
      background: '#111',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>Delicious Foods</h2>
      <div>
        <a href="/" style={{ margin: '10px', color: 'white' }}>Home</a>
        <a href="/menu" style={{ margin: '10px', color: 'white' }}>Menu</a>
        <a href="/contact" style={{ margin: '10px', color: 'white' }}>Contact</a>
      </div>
    </nav>
  );
}