import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  return (
    <>
      <div className="grid grid-cols-2 mx-8">
        <div className="border rounded-xl shadow-2xl flex flex-col items-center h-[70vh] w-[80%] pt-8">
          <img
            src="/profile-image.jpg"
            alt="profile-image"
            width={200}
            height={200}
            className="rounded-full"
          />
          <div className="mt-8 flex flex-col items-start">
            <span className="mt-2">Khushi Sharma</span>
            <span className="mt-2">khushisharma1309@gmail.com</span>
            <span className="mt-2">8745871331</span>
          </div>
        </div>
        <div className="border mr-5 bg-[#e1e1e1] text-black shadow-2xl rounded-lg py-5 h-[90vh]">
          <h1 className="text-center text-[30px]">Your Reservations</h1>
          <div className="text-center mt-20">
            <h1>Currently there are no reservations!</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
