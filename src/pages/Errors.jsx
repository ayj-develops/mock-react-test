import React from 'react';
import { Link } from 'react-router-dom';
import ChangeTitle from '../seo/ChangeTitle';

function Page404() {
  ChangeTitle('404 Not Found');
  return (
    <div className="container p-6">
      <div className="py-6 is-flex is-flex-direction-column is-justify-content-center">
        <h1 className="is-size-2">404 Not found.</h1>
        <h3 className="is-size-4"><Link to="/">Go Home.</Link></h3>
      </div>
    </div>
  );
}

export default Page404;
