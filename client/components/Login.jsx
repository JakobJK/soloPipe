import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogin } from '../store/action';

export default function Login() {
  const dispatch = useDispatch();
  return (
    <div className="login">
      <input type="text" id="loginInput" placeholder="Username" />
      <br />
      <input type="password" id="passwordInput" placeholder="Password" />
      <br />
      <button
        type="button"
        onClick={() => {
          const username = document.getElementById('loginInput').value;
          const password = document.getElementById('passwordInput').value;
          if (username && password) {
            fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username,
                password,
              }),
            }).then(response => response.json())
              .then((data) => {
                dispatch(setLogin(data));
              })
              .catch(error => error);
          }
        }}
      >
        Login
      </button>


      <Link to="/forgot">
        <div className="forgot">


          Forgot your username or password?
        </div>

      </Link>

    </div>
  );
}
