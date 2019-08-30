
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSubmission } from '../store/action';
import Companies from './Companies';

export default function Dashboard() {
  const loaded = useSelector(state => state.submission.submissionLoaded);
  const submissionState = useSelector(state => state.submission.submissions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loaded === 0) {
      fetch('/api/submissions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
        .then((data) => {
          const remodeled = data.reduce((acu, ite) => {
            if (!acu.hasOwnProperty(ite.company)) {
              acu[ite.company] = {};
            }
            if (!acu[ite.company].hasOwnProperty(ite.project)) {
              acu[ite.company][ite.project] = {};
            }
            if (!acu[ite.company][ite.project].hasOwnProperty(ite.asset)) {
              acu[ite.company][ite.project][ite.asset] = [];
            }

            acu[ite.company][ite.project][ite.asset].push([ite.submissionid, ite.report, ite.companyid, ite.filelocation, ite.asset, ite.project, ite.uploaded, ite.company]);
            return acu;
          }, {});

          dispatch(setSubmission(remodeled));
        })
        .catch(error => error);
    }
  });

  const listCompanies = Object.keys(submissionState).map(x => <Companies company={x} projects={submissionState[x]} />);
  return (
    <React.Fragment>
      <div className="dashboardHeader">
        Dashboard
      </div>
      {listCompanies}
    </React.Fragment>
  );
}
