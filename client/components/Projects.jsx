import React from 'react';
import Assets from './Assets';

export default function Projects(props) {
  const { assets, title } = props;
  const allAssets = Object.keys(assets).map(x => <Assets title={x} details={assets[x]} />);

  return (
    <React.Fragment>
      <div className="projectHeadline">
        {title}
        {' '}
      /////// PROJECT
      </div>
      {allAssets}
    </React.Fragment>
  );
}
