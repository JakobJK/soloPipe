import React from 'react';

import { useSelector } from 'react-redux';

export default function Profile() {
  const username = useSelector(state => state.profile.username);
  return (
    <div>
      <h1>Profile</h1>
      <h2>
        Name:
        {username}
      </h2>
    </div>
  );
}
