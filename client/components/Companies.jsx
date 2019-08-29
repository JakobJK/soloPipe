import React from 'react';
import Projects from './Projects';

export default function Submissions(props) {
  const { company, projects } = props;

  const listCompanies = Object.keys(projects).map(x => <Projects title={x} assets={projects[x]} />);
  return (
    <div>
      <h2>{company}</h2>
      {listCompanies}
    </div>
  );
}
