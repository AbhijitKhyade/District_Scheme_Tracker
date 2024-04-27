import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ButtonComp from '../../components/Button';
import { BASE_URL } from '../../api';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(`${BASE_URL}/auth/send-email`, formData);
      console.log(response.data);
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
    } catch (error) {
      console.log(error);
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
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}
          className="mt-2 flex flex-col justify-between flex-grow  "
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

          <ButtonComp name={"Send Email"} type={'submit'} className={'mt-4 mb-2'} fullWidth />

        </form>
      </Card>
    </div>
  )
}
