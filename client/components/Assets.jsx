import React from 'react';
import Asset from './Asset';

export default function Assets(props) {
  const detailesColumns = props.details.map(x => (
    <Asset
      submissionid={x[0]}
      report={x[1]}
      companyid={x[2]}
      filelocation={x[3]}
      asset={x[4]}
      uploaded={x[6]}
    />
  ));
  return (
    <React.Fragment>
      <div className="assetHeadline">
        {props.title}
      </div>

      {detailesColumns}
    </React.Fragment>
  );
}
