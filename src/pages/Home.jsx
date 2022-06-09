import React from 'react';
import Navbar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';

function Home() {
  ChangeTitle('Home');

  const LOGO_URL = `${process.env.PUBLIC_URL}/ayjImage.png`;

  return (
    <div className="homepage p-5">
      <Navbar logoUrl={LOGO_URL} />
      <div className="container py-5">
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          The UI (User interface) here does not represent the final product.
          In fact, this is only a mockup of the front-end UI.
          However, it is complete in functionality.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>


        {/*
            TODO: try out auth here
        */}

      </div>
    </div>
  );
}

export default Home;
