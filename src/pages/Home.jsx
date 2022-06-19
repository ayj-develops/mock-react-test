/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';
import { useAuth } from '../routes/AuthContextProvider';

function Home() {
  ChangeTitle('Home');

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [allClubData, setAllClubData] = useState([]);


  const { currentUser, currentIdToken } = useAuth();

  // component did mount
  useEffect(() => {
    if (currentUser) {
      setCurrentUserEmail(currentUser.email);
    }
  });

  // const getClubsInfo = async () => {
  //   const response = await axios.get('http://localhost:8000/api/v0/club');
  //   setAllClubData(response.data);
  // };

  // useEffect(() => {
  //   getClubsInfo();
  // }, [allClubData.length]);

  return (
    <div className="container mx-auto px-5 pt-5">
      <CustomNavbar />
    </div>
  );
}

export default Home;
