import React from 'react';

export default function Asset(props) {
  const {
    submissionid, report,
    companyid,
    filelocation,
    asset,
    uploaded,
  } = props;
  return (
    <div className="assetItem">
      {report}
      <a href={`/api/submission/${submissionid}`}>Download file</a>
    </div>
  );
}
