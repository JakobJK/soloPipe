import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../store/action';
import User from './User';


export default function Admin() {
  const loaded = useSelector(state => state.users.usersLoaded);
  const users = useSelector(state => state.users.users);
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

  const user = users.map(x => <User user={x} />);
  return (
    <div>
      <h1>
        Admin
      </h1>

      {user}
    </div>
  );
}
