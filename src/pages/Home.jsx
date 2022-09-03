/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, Badge, Tooltip,
} from 'flowbite-react';
import { MdCancel } from 'react-icons/md';
import CustomNavbar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';
import { useAuth } from '../routes/AuthContextProvider';
import Loading from '../components/Loading';

const HERO_URL = `${process.env.PUBLIC_URL}/hero_image.png`;
const EMOJI_URL = `${process.env.PUBLIC_URL}/wave.png`;


function Home() {
  ChangeTitle('Home');

  const {
    loginWithGoogle, logout, currentUser, currentIdToken, loggedIn,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
    navigate('/');
  };

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [allClubData, setAllClubData] = useState([]);

  // component did mount
  useEffect(() => {
    if (currentUser) {
      setCurrentUserEmail(currentUser.email);
    }
  });

  return (
    <div className="container mx-auto min-h-screen">
      <div className="px-4 max-w-screen-xl lg:px-12 lg:justify-between lg:items-center">
        <CustomNavbar />
      </div>
      <div className="container mx-auto px-14 pt-6">
        {loggedIn ? (
          <div className="py-8 lg:px-4">
            <h1 className="mb-4 text-6xl">
              <span className="font-bold">Hello&nbsp;</span>
              {currentUser ? currentUser.displayName.split(' ')[0] : null}
              <span><img className="inline px-2 h-20" src={EMOJI_URL} alt="wave emoji" /></span>
            </h1>
            <h2 className="text-3xl text-neutral-400">
              Check out what&apos;s happening with your favourite clubs!
            </h2>
            <div id="favorites-club" className="py-11">
              <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4">
                <div className="max-w-sm">
                  <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                      <h1>Hello</h1>
                      <div className="">
                        <Tooltip
                          content="Remove from favorites"
                          animation="duration-500"
                        >
                          <button type="submit">
                            <MdCancel className="hover:text-red-400" />
                          </button>
                        </Tooltip>
                      </div>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions
                      of 2021 so far, in reverse chronological order.
                    </p>
                    <Button>
                      Visit Club
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
            <hr />
            <h2 className="text-4xl mt-11 font-bold">
              Recent announcements
            </h2>
            <div id="announcements" className="py-5">
              <Card>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology
                  acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <Button>
                  Read more
                  <svg
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="flex-initial w-1/2">
              <h1 className="text-4xl md:text-7xl font-bold py-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">One place.</h1>
              <h1 className="text-4xl md:text-7xl font-bold py-2">
                <span className="">All&nbsp;</span>
                your favourite clubs.
              </h1>
              <p className="text-2xl text-slate-400 py-4 w-2/3">
                Stay up to date with the latest events
                and announcements from the clubs you love.
              </p>
              <div className="pt-4">
                <Button size="lg" gradientDuoTone="pinkToOrange">
                  <button onClick={handleLogin} type="button">Get Started</button>
                </Button>
              </div>
            </div>
            <img src={HERO_URL} alt="hero" className="hidden md:block flex-auto order-last" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
