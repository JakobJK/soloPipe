import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const permission = useSelector(state => state.profile.permission);
  const listItems = ['Dashboard'];

  if (permission === 'isAdmin') listItems.push('Admin');
  const navigationalItems = listItems.map(x => <Link to={`/${x.toLowerCase()}`}><li>{x}</li></Link>);
  return (
    <nav>
      <div>Logo</div>
      <ul>
        {navigationalItems}
      </ul>

      <Link to="/profile">Profile</Link>
    </nav>
  );
}
