import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../api';
import ButtonComp from '../../components/Button';
import { states_districts } from '../../data';

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    state: "Maharashtra",
    district: "",
  });
  const [citizen, setCitizen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') {
      setCitizen(value === 'Citizen');
    }
    setFormData({
      ...formData,
      [name]: value,
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

    if (!formData.role) {
      toast.warning("Please select a role", {
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
    else if (!formData.name) {
      toast.warning("Please enter your name", {
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
    } else if (formData.role === 'Citizen' && !formData.district) {
      toast.warning("Please select your district", {
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
    // console.log(formData);
    try {
      setLoading(true);
      if (formData.role === 'Citizen') {
        const response = await axios.post(`${BASE_URL}/auth/register`, formData);
        // console.log(response.data);
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

        navigate('/auth/login');
      } else {
        const response = await axios.post(`${BASE_URL}/auth/verify-officer`, formData);
        // console.log(response.data);
        navigate('/auth/login');
      }
      setLoading(false);
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
      setLoading(false);
    }
  }

  // const districtOptions = states_districts.find(state => state.state === formData.state).districts;

  return (
    <div
      className="flex justify-center items-center h-[100vh]"
    >
      <Card
        color="transparent"
        shadow={true}
        className="border bg-white border-gray-300 w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4 mb-2 mt-10 p-6 rounded-md flex flex-col justify-between h-auto"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 text-center w-full text-bold"
        >
          Register
        </Typography>

        <form
          className="mt-2 flex flex-col justify-between flex-grow  " onSubmit={handleSubmit}
        >
          <div className="mb-4 flex justify-between items-center">
            <div className="w-full">
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray">
                  Role
                </Typography>
              </div>
              <Select label='Role' size="lg" name='role'
                onChange={(value) =>
                  handleInputChange({
                    target: { name: "role", value },
                  })
                }
              >
                <Option value="" disabled>Select Role</Option>
                <Option value="District Officer" >District Officer</Option>
                <Option value="Citizen" >Citizen</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div className="w-full">
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray">
                  Name
                </Typography>
              </div>
              <Input
                size="lg"
                name="name"
                value={formData.name}
                placeholder="Rahul Kumar"
                label='Name'
                onChange={handleInputChange}
              />
            </div>
          </div>
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
            <div className="absolute inset-y-0 top-6 right-0 flex items-center pr-3">
              {showPassword ? (
                <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>
          {!citizen ? (
            <>
              <ButtonComp name={"Verify and Register"} type={'submit'} className={'mt-4 mb-2'} fullWidth loading={loading} />
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <div className="w-full">
                  <div className="flex justify-between">
                    <Typography variant="h6" color="blue-gray">
                      District
                    </Typography>
                  </div>
                  {/* <Input
                    size="lg"
                    name="district"
                    value={formData.district}
                    placeholder="Pune"
                    label='District'
                    onChange={handleInputChange}
                  /> */}
                  <Select
                    size="lg"
                    name='district'
                    label={"Select District"}
                    value={formData.district}
                    onChange={(value) =>
                      handleInputChange({
                        target: { name: "district", value },
                      })
                    }
                  >
                    <Option value="" disabled>Select District</Option>
                    <Option value="Pune" >Pune</Option>
                    <Option value="Solapur" >Solapur</Option>
                    <Option value="Sangli" >Sangli</Option>
                    <Option value="Kolhapur" >Kolhapur</Option>
                    {/* {districtOptions.map((district) => {
                      return (
                        // <Option value={district} key={district} >{district}</Option>
                        <Option value={district} key={district} >{district}</Option>
                      )
                    })} */}
                  </Select>


                </div>
              </div>
              <ButtonComp name={"Register"} type={'submit'} className={'mt-4 mb-2'} fullWidth loading={loading} />
            </>
          )}

          <div >
            <span className="text-gray-700 mt-2 text-sm flex justify-between" >
              Already a user ?
              <Link to={"/auth/login"} className="text-blue-500 mx-2">
                Login
              </Link>
            </span>
          </div>
        </form>
      </Card>
    </div>
  )
}
