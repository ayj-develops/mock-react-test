import React from 'react';
import { Link } from 'react-router-dom';
import ChangeTitle from '../utils/changeTitle.utils';

function Page404() {
  ChangeTitle('404 Not Found');
  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-center items-center h-screen">
        <div>
          <h1 className="text-6xl md:text-8xl font-bold underline decoration-amber-500">404</h1>
          <br />
          <p className="text-4xl font-semibold">
            Nothing seems to be here.&nbsp;
            <span>
              <Link to="/" className="underline text-blue-700">Return home?</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page404;
