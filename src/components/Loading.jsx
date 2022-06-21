import React from 'react';

const LOGO_URL = `${process.env.PUBLIC_URL}/ayjImage.png`;


function Loading() {
  return (
    <div className="container mx-auto px-14 pt-6 flex flex-col items-center justify-center">
      <img
        src={LOGO_URL}
        alt="AYJ Logo"
        className="pb-11"
      />
      <h1 className="text-4xl pt-4">Getting things ready...</h1>
    </div>
  );
}

export default Loading;
