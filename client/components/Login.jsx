import React from 'react';

export default function Login() {
  return (
    <div>
      <input type="text" id="loginInput" />
      <br />
      <input type="password" id="passwordInput" />
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
              .then(data => console.log(data))
              .catch(error => error);
          }
        }}
      >
        Submit

      </button>
    </div>
  );
}
