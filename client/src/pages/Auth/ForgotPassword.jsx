import React from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ButtonComp from '../../components/Button';

export default function ForgotPassword() {
  return (
    <div
      className="flex justify-center items-center h-[100vh] "
    // style={{
    //   backgroundImage: `url('../../src/assets/loginbg.jpg')`,
    //   backgroundSize: "cover",
    //   opacity: "1.0",
    // }}
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

        <form
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
                // value={formData.gmail}
                placeholder="example@gmail.com"
                label='Email'
              // onChange={handleInputChange}
              />
            </div>
          </div>

          <ButtonComp name={"Send Email"} type={'submit'} className={'mt-4 mb-2'} fullWidth />

        </form>
      </Card>
    </div>
  )
}
