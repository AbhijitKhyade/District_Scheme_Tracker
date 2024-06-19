import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ButtonComp from '../../components/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { BASE_URL } from '../../api';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const isValidEmail = (email) => {
    // Regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!isValidEmail(formData.email)) {
      toast.warning("Enter a valid email address", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, formData);
      // console.log(response.data);
      toast.success(response.data.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <div
      className="flex justify-center items-center h-[100vh] "
    >
      <Card
        color="transparent"
        shadow={true}
        className="border bg-white border-gray-300 w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4 mb-12 p-6 rounded-md flex flex-col justify-between h-auto"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 text-center w-full text-bold"
        >
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}
          className="mt-2 flex flex-col justify-between flex-grow  "
        >

          <div className="mb-4 ">
            <Typography variant="h6" color="blue-gray">
              Email
            </Typography>
            <Input
              size="lg"
              name="email"
              value={formData.email}
              type='email'
              placeholder='example@gmail.com'
              label="Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div className="w-full relative">
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray">
                  New Password
                </Typography>
              </div>
              <Input
                size="lg"
                name="newPassword"
                value={formData.newPassword}
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                label='New Password'
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0  top-6 right-0 flex items-center pr-3">
                {showPassword ? (
                  <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 relative">
            <Typography variant="h6" color="blue-gray">
              Confirm Password
            </Typography>
            <Input
              size="lg"
              name="confirmPassword"
              value={formData.confirmPassword}
              type={showPassword ? "text" : "password"}
              placeholder='*********'
              label="Confirm Password"
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 top-6 right-0 flex items-center pr-3">
              {showPassword ? (
                <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>

          <ButtonComp name={"Reset Password"} type={'submit'} className={'mt-4 mb-2'} fullWidth />

        </form>
      </Card>
    </div>
  )
}
