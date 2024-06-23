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

export default function HomePage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (currentUser) {
      if (currentUser.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (currentUser.role === 'Citizen') {
        navigate('/citizen/dashboard');
      } else if (currentUser.role === 'ofDistrict Officer') {
        navigate('/officer/dashboard');
      }
    } else {
      navigate('/auth/login');
    }
  };
  return (
    <div className='overflow-hidden' >
      <NavbarList />
      {/* <div className="w-full h-full m-2 px-4">
        <div className="flex flex-col items-center h-full">
          <Typography variant='h3' className='text-center font-bold text-4xl mt-4 animate-bounce shadow-deep-orange-500'
            style={{
              backgroundImage: 'linear-gradient(45deg, #FFB800, #FF6347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              zIndex: -1
            }}>Welcome to District Schemes </Typography>
          <div className='mt-4'>
            <img src={map} alt="India" />
          </div>
         
        </div>
      </div> */}
      <div className=" min-h-screen p-6">
        <header className="p-6 rounded-md shadow-md text-center " >
          <motion.h1
            className="text-3xl font-bold  lg:text-4xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: 'linear-gradient(45deg, #FFB800, #FF6347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              zoom: 1.2
            }}
          >
            Welcome to District Scheme Tracker
          </motion.h1>
          <motion.p
            className="text-lg mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Stay informed about government schemes and track their implementation in your district.
          </motion.p>
        </header>

        <main className="mt-8 space-y-12">
          <section className="flex flex-col gap-3 md:flex-row items-center mb-8">
            <motion.div
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold " style={{ color: '#212121' }}>Discover Government Schemes</h2>
              <p className="mt-2 text-gray-700">
                Our application provides comprehensive information about various government schemes designed to benefit citizens at the district level. Explore a wide range of initiatives aimed at improving your community and learn how you can take advantage of these opportunities.
              </p>
            </motion.div>
            <motion.img
              src={img1}
              alt="Government Schemes"
              className="mt-4 rounded-md shadow-lg  md:w-1/2 order-1 md:order-2 object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </section>

          <section className="flex flex-col gap-3 md:flex-row items-center mb-8">
            <motion.img
              src={img2}
              alt="Implementation Progress"
              className="mt-4 rounded-md shadow-md md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold" style={{ color: '#212121' }}>Track Implementation Progress</h2>
              <p className="mt-2 text-gray-700">
                Stay updated on the progress of scheme implementation in your district. Our platform offers schemes tracking, allowing you to see how funds are being utilized and the impact of these schemes on your community.
              </p>
            </motion.div>
          </section>

          <section className="flex flex-col gap-3 md:flex-row items-center mb-8">
            <motion.div
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold " style={{ color: '#212121' }}>Provide Feedback and Suggestions</h2>
              <p className="mt-2 text-gray-700">
                Your input matters. Use our application to give feedback, make suggestions, or report any issues related to scheme implementation. Help us ensure that these initiatives are effective and meet the needs of your district.
              </p>
            </motion.div>
            <motion.img
              src={img3}
              alt="Feedback"
              className="mt-4 rounded-md shadow-md md:w-1/2 order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </section>

          <div className="text-center">
            <motion.button
              className=" py-2 px-4 rounded-md shadow-md font-bold  transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: '#FF7061', color: 'white' }}
              onClick={handleGetStarted}
            >
              Get Started
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  )
}
