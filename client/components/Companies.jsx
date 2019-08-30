import React from 'react';
import Projects from './Projects';

export default function Submissions(props) {
  const { company, projects } = props;


  const listProjects = Object.keys(projects).map(x => <Projects title={x} assets={projects[x]} />);
  return (
    <React.Fragment>
      <div className="companyHeadline">
        <h2 onClick={() => { console.log({ company }); }}>{company}</h2>
      </div>
      {listProjects}

    </React.Fragment>
  );
}
