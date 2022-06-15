/* eslint-disable indent */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CustomNavbar from '../components/Nav';


function ClubsPage() {
  const [allClubData, setAllClubData] = useState([]);

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
        <h1>All Clubs</h1>
        {
          allClubData === undefined ? (
            <h3>Oops. Something went wrong, no clubs exist </h3>) : allClubData.map((club) => (
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
  );
}

export default ClubsPage;
