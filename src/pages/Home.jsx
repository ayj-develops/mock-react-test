/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { sha1 } from 'object-hash';
import axios from 'axios';
import CustomNavbar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';
import { useAuth } from '../routes/AuthContextProvider';

function Home() {
  ChangeTitle('Home');

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [hashedEmail, sethashedEmail] = useState('');
  const [allClubData, setAllClubData] = useState([]);


  const { currentUser } = useAuth();

  // component did mount
  useEffect(() => {
    if (currentUser) {
      setCurrentUserEmail(currentUser.email);
      sethashedEmail(sha1(currentUser.email));
    }
  });

  const getClubsInfo = async () => {
    const response = await axios.get('http://localhost:8000/api/v0/club');
    setAllClubData(response.data);
  };

  useEffect(() => {
    getClubsInfo();
  }, [allClubData.length]);

  return (
    <div className="homepage p-5">
      <div className="container">
        <div className="pb-3">
          <CustomNavbar />
        </div>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          The UI (User interface) here does not represent the final product.
          In fact, this is only a mockup of the front-end UI.
          However, it is complete in functionality.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
        <h1>Feed</h1>
        <div className="row">

          <div className="col-lg-9">
            <h1>club posts</h1>
          </div>
          <div className="px-2 py-2 col-lg-3 col-md-4 col-sm-5">
            {
              allClubData === undefined ? null : allClubData.map((club) => (
                <div className="py-2">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{club.name}</h5>
                      <p className="card-text">{club.description}</p>
                      <a href="/" className="btn btn-primary">Visit</a>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
