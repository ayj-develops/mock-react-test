import React from 'react';
import { QuestionCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const containerDivStyle = {
  width: '48rem',
};

function LoginPage() {
  return (

    <div className="LoginPage">
      <div className="p-5">
        <div className="container-md" style={containerDivStyle}>
          <h1>Sign in with your TDSB account</h1>
          <form className="py-4">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else
                {' '}
                {' '}
                <Link to="/privacy-policy"><QuestionCircle /></Link>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;
