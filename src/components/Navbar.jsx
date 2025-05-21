import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul className='navbar'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/articles">View all articles</Link></li>
        <li><Link to="/topics">Browse by topic</Link></li>
        <li><Link to="/users">Browse by author</Link></li>
      </ul>
    </nav>
  );
}


export default Navbar;