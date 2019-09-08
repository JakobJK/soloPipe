
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSubmission } from '../store/action';
import Submissions from './Submissions';

export default function Dashboard() {
  const loaded = useSelector(state => state.submission.submissionLoaded);
  const submissionsArr = useSelector(state => state.submission.submissions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loaded === 0) {
      fetch('/api/submissions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
        .then((data) => {
          const remodeled = data.reduce((acu, ite) => { acu[ite]; }, {});
          // dispatch(setSubmission(data));
        })
        .catch(error => error);
    }
  });

  const listSubmissions = submissionsArr.map(x => <Submissions name={x.project} />);
  return (
    <div>
      <h1>
        Dashboard
      </h1>
      {listSubmissions}
    </div>
  );
}
