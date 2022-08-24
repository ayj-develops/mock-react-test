import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, useNavigate,
} from 'react-router-dom';
import {
  Button, Card,
} from 'flowbite-react';
// import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import CustomNavBar from '../components/Nav';
import ChangeTitle from '../utils/changeTitle.utils';
// import { useAuth } from '../routes/AuthContextProvider';
// import Loading from '../components/Loading';

// const api = Axios.create({
//   baseURL: `https://localhost:8000/api/v0`
// })

// const HERO_URL = `${process.env.PUBLIC_URL}/hero_image.png`;
// const EMOJI_URL = `${process.env.PUBLIC_URL}/wave.png`;

function ClubsPage() {
  return (
    <Router>
      <Routes>
        <Route path="/clubs" element={<Main />} />
        <Route path="/clubs/:slug" element={<ClubSite />} />
      </Routes>
    </Router>
  );
}

function Main() {
  ChangeTitle('Clubs');

  const [masterList, setMasterList] = useState([]);

  const navigate = useNavigate();
  const routeChange = (slug) => {
    const path = `/clubs/:${slug}`;
    navigate(path);
  };

  axios.get('http://localhost:8000/api/v0/clubs').then((res) => {
    setMasterList(res.data.map((item) => (
      <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
          <h1>{item.name}</h1>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        <Button type="submit" onClick={() => routeChange(item.slug)}>Visit Club</Button>
      </Card>
    )));
  });

  return (
    <div className="px-4 max-w-screen-xl lg:px-12 lg:justify-between lg:items-center">
      <CustomNavBar />
      <div className="py-11">
        <ul id="clubList" className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4">
          {masterList}
        </ul>
      </div>
    </div>
  );
}

function ClubSite() {
  return (
    <div> hello world </div>
  );
}

export default ClubsPage;
