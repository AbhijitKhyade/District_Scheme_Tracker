import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
  useSelect,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../api';
import ButtonComp from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signInUserFailure, signInUserStart, signInUserSuccess } from '../../redux/userSlice';

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email) => {
    // Regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      if (!formData.email && !formData.password) {
        toast.warning("Please enter your email and password", {
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
      else if (!formData.email) {
        toast.warning("Please enter your email", {
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
      else if (!formData.password) {
        toast.warning("Please enter your password", {
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
      dispatch(signInUserStart());
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      // console.log(response.data.data);
      toast.success(response?.data.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(signInUserSuccess(response.data.data));

      let pathLink = "";
      if (response.data.data && response.data.data.role === "Admin") {
        pathLink = "/admin/dashboard";
      } else if (response.data.data && response.data.data.role === "District Officer") {
        pathLink = "/officers/dashboard";
      } else if (response.data.data && response.data.data.role === "Citizen") {
        pathLink = "/citizens/dashboard";
      }
      navigate(pathLink);
    } catch (error) {
      console.log('Error:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(signInUserFailure(error.response.data.message));
    }
  }

  return (
    <div className="flex justify-center items-center h-[100vh] ">
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
          Login
        </Typography>

        <form
          className="mt-2 flex flex-col justify-between flex-grow  "
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex justify-between items-center">
            <div className="w-full">
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray">
                  Email
                </Typography>
              </div>
              <Input
                size="lg"
                name="email"
                value={formData.email}
                placeholder="example@gmail.com"
                label='Email'
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <Typography variant="h6" color="blue-gray">
              Password
            </Typography>
            <Input
              size="lg"
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              placeholder='*********'
              label="Password"
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-3">
              {showPassword ? (
                <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>

          <ButtonComp name={"Login"} type={'submit'} className={'mt-4 mb-2'} fullWidth loading={loading} />

          <div className="flex justify-between">
            <span className="text-gray-700 mt-2 text-sm">
              New user ?
              <Link to={"/auth/register"} className="text-blue-500 mx-2">
                Register
              </Link>
            </span>
            <span className="text-gray-700 mt-2 text-sm">
              <Link to={"/auth/forgot-password"} className="text-red-300 mx-2">
                Forgot Password
              </Link>
            </span>
          </div>
        </form>
      </Card>
    </div>
  )
}
