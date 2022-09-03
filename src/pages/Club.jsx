/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button, Card, Tooltip,
} from 'flowbite-react';
import { MdAddCircle } from 'react-icons/md';
import axios from 'axios';
import CustomNavBar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';
import { useAuth } from '../routes/AuthContextProvider';
import Loading from '../components/Loading';
import NotAuthd from '../components/NotAuthd';
// import Loading from '../components/Loading';

// const api = Axios.create({
//   baseURL: `https://localhost:8000/api/v0`
// })

// const HERO_URL = `${process.env.PUBLIC_URL}/hero_image.png`;
// const EMOJI_URL = `${process.env.PUBLIC_URL}/wave.png`;

function ClubPage() {
  ChangeTitle('Club');

  const { currentIdToken, loggedIn, userData } = useAuth();
  const [club, setClub] = useState({});
  const [authToken, setAuthToken] = useState(currentIdToken);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [profilePictures, setProfilePictures] = useState(new Set());
  const [isLessThan12, setIsLessThan12] = useState(false);
  const { id } = useParams();

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
    axios.get(`http://localhost:8000/api/v0/clubs/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      if (res.data.ok === 'true') {
        setIsFetching(false);
        setClub(res.data.club);
        if (res.data.club.members.length < 12) {
          setIsLessThan12(true);
          res.data.club.members.forEach((member) => {
            axios.get(`http://localhost:8000/api/v0/users/${member}`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }).then((response) => {
              if (response.data.ok === 'true') {
                setProfilePictures((prevState) => new Set(prevState)
                  .add(response.data.user.profile_pic));
              }
            });
          });
        } else {
          for (let i = 0; i < 12; i += 1) {
            axios.get('http://localhost:8000/api/v0/users/' + res.data.club.members[i], {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }).then((response) => {
              if (response.data.ok === 'true') {
                setProfilePictures((prevState) => new Set(prevState)
                  .add(response.data.user.profile_pic));
              }
            });
          }
        }
      }
    });
  }, [authToken]);

  return (
    <div className="px-4 lg:px-36 lg:justify-between lg:items-center">
      <CustomNavBar />
      {isLoading ? <NotAuthd />
        : (
          <div className="wrapper px-4">
            {isFetching ? <Loading /> : (
              <div className="wrapper">
                <div className="py-3">
                  <div className="relative rounded-lg w-full h-48" id="bannerImage">
                    <img
                      className="object-cover rounded-lg w-full h-48"
                      src={club.bannerImage || 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop'}
                      alt="banner"
                    />
                    <h2 className="text-white rounded-lg absolute h-fit w-fit px-4 py-2 left-4 -bottom-8 bg-gradient-to-r from-pink-800 to-orange-400 sm:text-3xl md:text-6xl font-bold">
                      {club.name}
                    </h2>
                  </div>
                </div>
                <div id="members" className="w-full pt-16">
                  <div className="flex items-center space-x-2 text-base">
                    <h4 className="font-semibold text-slate-900">Members</h4>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {club.members.length}
                    </span>
                  </div>
                  <div className="mt-3 flex -space-x-2 overflow-hidden">
                    {[...profilePictures].map((profilePicture) => (
                      <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={profilePicture} alt="" />))}
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}


export default ClubPage;
