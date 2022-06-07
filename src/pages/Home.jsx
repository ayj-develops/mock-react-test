import React from 'react';
import Navbar from '../components/Nav';
import ChangeTitle from '../seo/ChangeTitle';

function Home() {
  ChangeTitle('Home');

  const LOGO_URL = `${process.env.PUBLIC_URL}/ayjImage.png`;

  return (
    <div className="homepage p-5">
      <Navbar logoUrl={LOGO_URL} />
      <div className="container">
        <div className="notification is-warning">
          The UI (User interface) here does not represent the final product.
          In fact, this is only a mockup of the front-end UI.
          However, it is complete in functionality.
        </div>


        {/*
            TODO: try out auth here
        */}

      </div>
    </div>
  );
}

export default Home;
