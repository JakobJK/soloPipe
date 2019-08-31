import React from 'react';

export default function User(props) {
  console.log(props.user);
  const {
    username, usermail, userid, company, permission,
  } = props.user;

  return (
    <tr>
      <td>

        {username}
      </td>
      <td>

        {company}
      </td>
      <td>

        {usermail}
      </td>

      <td>

        {permission !== 'isAdmin' ? (
          <button
            type="submit"
            onClick={() => {
              if (window.confirm(`Are you sure you want to promote  ${username} to Admin?`)) {
                console.log(`Promoted ${username}`);
              }
            }}
          >
            Promote User to Admin

          </button>
        ) : (
            'Already Admin'
          )}
      </td>
      <td>
        {permission !== 'isAdmin' ? (
          <button
            type="submit"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${username}?`)) {
                console.log(`Delete user ${username}`);
              }
            }
            }
          >
            Delete
          </button>
        ) : ('Cannot Delete Admins')}
      </td>
    </tr>
  );
}
