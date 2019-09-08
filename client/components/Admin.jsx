import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../store/action';

export default function Admin() {
  const loaded = useSelector(state => state.users.usersLoaded);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loaded === 0) {
      fetch('/api/getusers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
        .then((data) => {
          dispatch(setUsers(data));
        })
        .catch(error => error);
    }
  });

  return (
    <div>
      <h1>
        Admin
      </h1>
    </div>
  );
}
