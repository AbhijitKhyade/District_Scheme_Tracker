import React from 'react'
import NavbarList from '../components/NavbarList'
import { Typography } from '@material-tailwind/react'
import map from '../assets/indiaMap.jpg'
import { motion } from 'framer-motion';
import img1 from '../assets/landing_page/img1.webp';
import img2 from '../assets/landing_page/img2.avif';
import img3 from '../assets/landing_page/img3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/HomePage.css';

export default function HomePage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (currentUser) {
      if (currentUser.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (currentUser.role === 'Citizen') {
        navigate('/citizens/dashboard');
      } else if (currentUser.role === 'ofDistrict Officer') {
        navigate('/officers/dashboard');
      }
    } else {
      navigate('/auth/login');
    }
  };
  return (
    <div className='overflow-hidden' >
      <NavbarList />

      <div className="box-container">
        <div className='text-dark'>
          <div className="img-container">
            <div className="image-container-1">
              <img src={img1} alt="image1" className="image-style-1" />
            </div>
            <div className="image-container-2">
              <img src={img2} alt="image1" className="image-style-2" />
            </div>

            <div className="image-container-3 hidden lg:block">
              <img src={img3} alt="image1" className="image-style-3" />
            </div>
          </div>
          <div >
            <div className="overlay-text">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Typography variant="h2" component="h1" className='text-5xl lg:text-8xl  break-words'>
                    Welcome to District Scheme Tracker
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Typography variant="h5" component="h1" className='mb-4'>
                    Explore government schemes and track their implementation in your district.
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <button onClick={handleGetStarted} className='btn text-white uppercase border-none  px-6 py-2 rounded-3xl  
                  font-semibold tracking-wide hover:shadow-2xl' >
                    Get Started
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
