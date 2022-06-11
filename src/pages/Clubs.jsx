import React from 'react';
import CustomNavbar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';

function Clubs() {
  ChangeTitle('Clubs');

  return (
    <div className="homepage p-5">
      <CustomNavbar />
      <div className="container py-5">

      </div>
    </div>
  );
}

export default Club;
