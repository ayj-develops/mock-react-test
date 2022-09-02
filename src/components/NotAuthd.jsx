import React from 'react';
import { Link } from 'react-router-dom';
import ChangeTitle from '../utils/changeTitle.utils';

function NotAuthd() {
  ChangeTitle('Oops...');
  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-center items-center h-screen">
        <div>
          <h1 className="text-6xl md:text-8xl font-bold underline decoration-pink-500">403</h1>
          <br />
          <p className="text-4xl font-semibold pb-4">
            What&apos;s the secret password...🤫
          </p>
          <Link to="/" className="text-3xl font-semibold underline text-blue-700">Return home?</Link>
        </div>
      </div>
    </div>
  );
}

export default NotAuthd;
