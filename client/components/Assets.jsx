import React from 'react';
import Asset from './Asset';

export default function Assets(props) {
  const detailesColumns = props.details.map(x => <Asset elem={x} />);
  return (
    <div>
      <div onClick={() => {
        console.log('lol');
      }}
      >
        {props.title}
      </div>

      {detailesColumns}
    </div>
  );
}
