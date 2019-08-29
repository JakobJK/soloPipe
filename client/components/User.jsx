import React from 'react';

export default function User(props) {
  const {
    username, usermail, userid, company,
  } = props.user;
  return (
    <div>
      {username}
      ,
      {company}
      ,
      {usermail}
      ,
    </div>
  );
}
