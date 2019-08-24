import React from 'react';

import { Link } from 'react-router-dom';

export default function NavBar() {
  const listItems = ['Dashboard', 'Admin'];
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
