import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const Sidebar = ({ onTabClick }) => {
  const router = useRouter();

  const handleTabClick = (tab) => {
    console.log("Clicked on tab:", tab);
    onTabClick(tab);
  };

  return (
    <>
      <div className="w-64 fixed top-0 left-0 h-full bg-[#301434] transition-all duration-300 ease-in-out text-[#ebebeb]">
        <h1
          className="text-[30px] font-vollkron font-bold ml-5 mt-5"
          onClick={() => router.push("/gravity-grill")}
        >
          Gravity Grill
        </h1>
        <div className="mt-10">
          <button
            className="flex flex-row justify-between px-3 py-2 bg-[#7d4e84] w-full cursor-pointer hover:bg-[#743a7d] text-[20px]"
            onClick={() => handleTabClick("Profile")}
          >
            Your Profile
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <button
            className="flex flex-row justify-between px-3 py-2 bg-[#7d4e84] w-full cursor-pointer hover:bg-[#743a7d] text-[20px]"
            onClick={() => handleTabClick("Reservation")}
          >
            Reservation
          </button>
          <button
            className="flex flex-row justify-between px-3 py-2 bg-[#7d4e84] w-full cursor-pointer hover:bg-[#743a7d] text-[20px] mt-2"
            onClick={() => handleTabClick("Feedback")}
          >
            Feedback
          </button>
        </div>
        <button className="bottom-0">LogOut</button>
      </div>
    </>
  );
};

export default Sidebar;
