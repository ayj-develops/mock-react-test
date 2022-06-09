import React from 'react';
import { Link } from 'react-router-dom';
import ChangeTitle from '../utils/ChangeTitle';

function Page404() {
  ChangeTitle('404 Not Found');
  return (
    <div className="container p-5">
      <div className="py-5">
        <h1 className="">404 Not found.</h1>
        <h3><Link className="text-decoration-none" to="/">Go Home.</Link></h3>
      </div>
    </div>
  );
}

export default Page404;
