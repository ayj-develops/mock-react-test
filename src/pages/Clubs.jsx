/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Card, Tooltip,
} from 'flowbite-react';
import { MdAddCircle } from 'react-icons/md';
import axios from 'axios';
import CustomNavBar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';
import { useAuth } from '../routes/AuthContextProvider';
import Loading from '../components/Loading';
import truncate from '../utils/truncate.utils';
import NotAuthd from '../components/NotAuthd';
// import Loading from '../components/Loading';

// const api = Axios.create({
//   baseURL: `https://localhost:8000/api/v0`
// })

// const HERO_URL = `${process.env.PUBLIC_URL}/hero_image.png`;
// const EMOJI_URL = `${process.env.PUBLIC_URL}/wave.png`;

function ClubsPage(props) {
  ChangeTitle('Clubs');

  const { currentIdToken, loggedIn } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [authToken, setAuthToken] = useState(currentIdToken);
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (currentIdToken) {
      setAuthToken(currentIdToken);
    }
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/v0/clubs', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      if (res.data.ok === 'true') {
        setClubs(res.data.clubs);
        setIsFetching(false);
      } else {
        setIsFetching(false);
        setIsError(true);
      }
    });
  }, [authToken]);



  return (
    <div className="px-4 max-w-screen-xl lg:px-12 lg:justify-between lg:items-center">
      <CustomNavBar />
      {isLoading ? <NotAuthd /> : (
        <div className="wrapper">
          <div className="py-3">
            <div className="flex justify-between">
              <h2 className="text-4xl mt-11 font-bold">
                All Clubs
              </h2>
              {isListView ? (
                <button className="self-end" type="button">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
              ) : (
                <button className="self-end" type="button">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                </button>
              )}
            </div>
            {isListView ? (<h1>list view</h1>) : (
              <div className="pt-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-4 auto-rows-max">
                {clubs.map((club) => (
                  <div key={club._id}>
                    <div className="max-w-lg">
                      <Card imgSrc={club.bannerImage || 'https://flowbite.com/docs/images/blog/image-1.jpg'}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                          <h1>{club.name}</h1>
                          <div className="">
                            <Tooltip
                              content="Add to favorites"
                              animation="duration-500"
                            >
                              <button type="submit">
                                <MdAddCircle className="hover:text-green-400" />
                              </button>
                            </Tooltip>
                          </div>
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          {truncate(club.description, 60)}
                        </p>
                        <Link to={`/clubs/${club._id}`}>
                          <Button>
                            Visit Club
                          </Button>
                        </Link>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default ClubsPage;
